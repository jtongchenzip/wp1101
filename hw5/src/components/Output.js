import "./Output.css";

export default function Output({value}) {
    return (
        <>
            <div className="output">
                <h1>{value}</h1>
            </div>
        </>
    );
}
