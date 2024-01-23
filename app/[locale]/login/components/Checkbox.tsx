interface CheckboxProps {
    checked?: boolean;
    checkboxStyle?: string;
    textStyle?: string;
    text?: string;
    style?: string;
}

export default function Checkbox(props: CheckboxProps) {
    return (
        <div className={`${props.style} flex flex-row`}>
            <input type="checkbox" defaultChecked={props.checked ?? false} className={`checkbox ${props.checkboxStyle}`} />
            <p className={`${props.textStyle} pl-2`}>{props.text}</p>
        </div>
    );
}