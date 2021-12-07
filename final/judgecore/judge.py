import subprocess
import time


class Judge:
    def __init__(self):
        pass

    def __enter__(self):
        subprocess.Popen('cd ../hack1 && yarn start', shell=True)

        time.sleep(20)  # FIXME: buffer for build, need further discussion or modify implementation

        subprocess.call('cd ../hack1 && yarn test', shell=True)

    def __exit__(self, exc_type, exc_value, traceback):
        print(f'{exc_type=}, {exc_value=}, {traceback=}')
        subprocess.call('cd ../hack1 && yarn stop', shell=True)
