import { Input } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import Title from '../Components/Title';

const SignIn = ({ me, setMe, setSignedIn, displayStatus }) => (
    <>
        <Title>
            <h1>My Chat Room</h1>
        </Title>
        <Input.Search
            prefix={<UserOutlined />}
            value={me}
            enterButton='Sign In'
            onChange={(e) => setMe(e.target.value)}
            placeholder='Enter your name'
            size='large'
            style={{ width:200, margin: 50}}
            onSearch={ ( name ) => {
                if(!name)
                    displayStatus({ type: 'error', msg: 'Missing username'})
                else 
                    setSignedIn(true) 
                }
            }
        />
    </>
) 

export default SignIn;