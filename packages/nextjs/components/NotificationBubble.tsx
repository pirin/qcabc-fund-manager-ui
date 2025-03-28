/**
 * Custom notification Bubble.
 */
export const NotificationBubble = ({ message, details }: { message: string; details: string | undefined }) => {
  return (
    <div className={`flex flex-col ml-1 cursor-default`}>
      <p className="my-0">{message}</p>
      {details && details.length > 0 ? <p className="block  text-md">{details}</p> : null}
    </div>
  );
};
