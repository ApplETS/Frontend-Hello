import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface Props {
	text: string;
	alertType?: AlertType;
	customStyle?: string;
	textStyle?: string;
	icon: IconDefinition;
}

export enum AlertType {
	error = 'alert-error',
	warning = 'alert-warning',
	success = 'alert-success',
	info = 'alert-info',
}

export default function Alert(props: Props) {
	return (
		<div className={props.customStyle}>
			<div role="alert" className={`alert ${props.alertType ?? 'alert-error'}`}>
				<FontAwesomeIcon icon={props.icon} className="w-5" />
				<p className={`${props.textStyle ?? ''}`}>{props.text}</p>
			</div>
		</div>
	);
}
