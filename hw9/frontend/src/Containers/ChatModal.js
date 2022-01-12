import { Input } from "antd";
import { useState } from "react";

export default function ChatModal({ visible, onCreate, onChange }) {
    const [name, setName] = useState("");

    return (
        <>
            { visible &&
                <Input.Search
                    placeholder="Create a chatroom with ..."
                    enterButton="Create"
                    size="large"
                    onChange={(e) => setName(e.target.value)}
                    onSearch={() => { onCreate({ name }); onChange();}}
                />
            }
        </>
    )
}