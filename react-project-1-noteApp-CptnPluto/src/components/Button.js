const Button = ({ color, text, onClick }) => {
    return (
        <button onClick={onClick} className={`button ${color}`}>
            {text}
        </button>
    );
};

export default Button;
