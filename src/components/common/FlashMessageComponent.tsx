import { useEffect, useState } from "react";
import { FlashMessage } from "../../model/FlashMessage";

interface FlashMessageProps {
  message: FlashMessage | null;
  onClose: () => void;
}

const FlashMessageComponent = ({ message, onClose }: FlashMessageProps) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (message) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
        onClose();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  if (!message || !visible) return null;

  return (
    <div
      className={`alert alert-${message.type} alert-dismissible fade show`}
      role="alert"
    >
      {message.message}
      <button
        type="button"
        className="btn-close"
        onClick={() => {
          setVisible(false);
          onClose();
        }}
        aria-label="Close"
      ></button>
    </div>
  );
};

export default FlashMessageComponent;
