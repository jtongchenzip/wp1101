from amqp import receive_task
from config import amqp_config

import asyncio
import aio_pika
from aio_pika.pool import Pool


async def main():
    loop = asyncio.get_event_loop()

    async def get_connection():
        return await aio_pika.connect_robust(
            host=amqp_config.host,
            port=amqp_config.port,
            login=amqp_config.username,
            password=amqp_config.password
        )

    connection_pool = Pool(get_connection, max_size=2, loop=loop)

    async def get_channel() -> aio_pika.Channel:
        async with connection_pool.acquire() as connection:
            return await connection.channel()

    channel_pool = Pool(get_channel, max_size=10, loop=loop)
    consume_name = "cypress"

    async def consume():
        async with channel_pool.acquire() as channel:  # type: aio_pika.Channel
            await channel.set_qos(10)

            queue = await channel.declare_queue(
                consume_name, durable=True, auto_delete=False
            )

            async with queue.iterator() as queue_iter:
                async for message in queue_iter:
                    try:
                        await receive_task(message.body, publish_func=publish)
                    except Exception as e:
                        print('message nacked, exception=', e)
                        await message.nack(requeue=False)
                    else:
                        await message.ack()

    async def publish(message: bytes, queue_name: str) -> None:
        async with channel_pool.acquire() as channel:  # type: aio_pika.Channel
            await channel.default_exchange.publish(
                aio_pika.Message(body=message),
                routing_key=queue_name,
            )

    async with connection_pool, channel_pool:
        task = loop.create_task(consume())
        await task


if __name__ == "__main__":
    loop = asyncio.get_event_loop()
    loop.run_until_complete(main())
    loop.close()
