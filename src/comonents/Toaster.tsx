import React, { useEffect, useState } from "react";
import { Notification } from "rsuite";


const Toaster=({ type, message }:any) => {
  const [visible, setVisible] = useState(true);

  function capitalizeFirstLetter(word: string): string {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {visible && (
        <Notification
          type={type}
          header={capitalizeFirstLetter(type)}
          closable
          onClose={() => setVisible(false)}
        >
          {message}
        </Notification>
      )}
    </>
  );
};

export default Toaster;
