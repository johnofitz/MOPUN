import Card from "../UI/Card";
import "./Login.css";
import "./Pane.css";

const Login = () => {
    return (
        <Card className ='pane'>
        <form>
            <div className="login__controls">
                <div className="login__control">
                    <label>Username</label>
                    <input type="text" />
                </div>
                <div className="login__control">
                    <label>Password</label>
                    <input type="password" />
                </div>
            </div>
            <div className="login__actions">
                <button type="submit">Login</button>
            </div>
        </form >
        </Card >
    

    );
};

export default Login;
