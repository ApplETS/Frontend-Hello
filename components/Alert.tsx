import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface AlertProps {
    text: string;
    alertType: string;
    customStyle?: string;
    textStyle?: string;
    icon: IconDefinition;
}

export default function Alert(props: AlertProps) {
    const alertType = props.alertType ? `alert-${props.alertType}` : 'alert-error';
    return (
        <div className={props.customStyle}>
            <div role='alert' className={`alert ${alertType}`}>
                <FontAwesomeIcon icon={props.icon} className='w-5' />
                <p className={props.textStyle}>
                    {props.text}
                </p>
            </div>
        </div>
    );
}