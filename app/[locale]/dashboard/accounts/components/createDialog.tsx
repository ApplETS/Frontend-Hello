import Dropdown from '@/components/SignUpActivity';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';

export default async function UserCreateDialog() {
	const t = await getTranslations('Accounts.create');
	return (
		<div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">
			<div className="bg-base-200 rounded-lg shadow-lg p-5 max-w-3xl w-full">
				<h2 className="text-2xl text-center font-semibold pb-4">{t('title')}</h2>
				<form action="">
					<div className="flex flex-row space-x-4 mb-4">
						{/* Organisation input */}
						<div className="flex flex-col flex-1">
							<label className="mb-2 text-base font-normal" htmlFor="organisation">
								{t('organisation')}
							</label>
							<input className="input input-ghost w-full" name="organisation" required />
						</div>
						{/* Activity dropdown */}
						<div className="flex flex-col flex-1">
							<label className="mb-2 text-base font-normal" htmlFor="activity">
								{t('activityarea')}
							</label>
							<Dropdown
								items={[
									{ title: t('activity.scientificClub') },
									{ title: t('activity.ets') },
									{ title: t('activity.sve') },
									{ title: t('activity.aeets') },
								]}
								inputName="activity"
							/>
						</div>
					</div>
					{/* Email input */}
					<div className="flex flex-col mb-4">
						<label className="text-md mb-2" htmlFor="email">
							{t('email')}
						</label>
						<input
							className="input input-ghost w-full"
							type="email"
							name="email"
							required
							placeholder="applets@etsmtl.ca"
						/>
					</div>
					<div className="divider divider-accent"></div>
					<div className="flex flex-row space-x-4 mb-4">
						<div className="w-3/5"></div>
						<button className="btn btn-secondary text-base-100 font-normal w-1/5">{t('close')}</button>
						<button className="btn btn-primary text-base-100 font-normal w-1/5">{t('send')}</button>
					</div>
				</form>
			</div>
		</div>
	);
}
