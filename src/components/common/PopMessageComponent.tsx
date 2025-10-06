import { Popover } from "bootstrap"; // ✅ 用 import，而不是 require
import { useEffect, useRef } from "react";

interface PopoverIconProps {
  content?: string;
  icon?: string;
  placement?: "top" | "bottom" | "left" | "right";
  color?: "danger" | "warning";
}

const PopoverIcon: React.FC<PopoverIconProps> = ({
  content = "No details provided.",
  icon = "bi-patch-question",
  placement = "top",
  color = "danger",
}) => {
  const spanRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    // spanRef.current → 拿到 <span> 的真實 DOM 節點
    if (spanRef.current) {
      // 初始化 Popover
      const popover = new Popover(spanRef.current, {
        trigger: "hover",
        content,
        placement,
        customClass: "custom-popover",
      });

      return () => {
        // 元件卸載時清除 popover，避免記憶體洩漏
        popover.dispose();
      };
    }
  }, [content, placement]);

  return (
    //就是告訴 React：「等這個 <span> 渲染完成後，把它的 DOM 節點存到 spanRef.current」。
    <span ref={spanRef} className={`text-${color} m-1`} style={{ cursor: "pointer" }}>
      <i className={`bi ${icon}`} />
    </span>
  );
};

export default PopoverIcon;