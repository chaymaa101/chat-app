// Component to display a skeleton loading animation for messages.
const MessageSkeleton = () => {
	return (
		<>
			{/* Skeleton for message container */}
			<div className='flex gap-3 items-center'>
				{/* Skeleton for avatar */}
				<div className='skeleton w-10 h-10 rounded-full shrink-0'></div>
				{/* Skeleton for message content */}
				<div className='flex flex-col gap-1'>
					<div className='skeleton h-4 w-40'></div> {/* Skeleton for message sender */}
					<div className='skeleton h-4 w-40'></div> {/* Skeleton for message body */}
				</div>
			</div>
			{/* Skeleton for message footer */}
			<div className='flex gap-3 items-center justify-end'>
				<div className='flex flex-col gap-1'>
					<div className='skeleton h-4 w-40'></div> {/* Skeleton for message timestamp */}
				</div>
				{/* Skeleton for avatar */}
				<div className='skeleton w-10 h-10 rounded-full shrink-0'></div>
			</div>
		</>
	);
};

export default MessageSkeleton; // Exporting the MessageSkeleton component.
