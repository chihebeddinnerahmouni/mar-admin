import { useEffect } from 'react'
import { useRef } from 'react'
import Stats from '../../components/ui/Stats'
import {
  BsPeopleFill,
  BsQuestionCircleFill,
  BsFillCalendarCheckFill,
} from "react-icons/bs";
import { MdDirectionsBoat } from "react-icons/md";
import { useTranslation } from 'react-i18next';


const statsCont = () => {

  const containerRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();
      let isDown = false;
      let startX: number;
      let scrollLeft: number;


    useEffect(() => {
      const container = containerRef.current;

      if (container) {
        const handleMouseDown = (e: MouseEvent) => {
          isDown = true;
          startX = e.pageX - container.offsetLeft;
          scrollLeft = container.scrollLeft;
        };

        const handleMouseLeave = () => {
          isDown = false;
        };

        const handleMouseUp = () => {
          isDown = false;
        };

        const handleMouseMove = (e: MouseEvent) => {
          if (!isDown) return;
          e.preventDefault();
          const x = e.pageX - container.offsetLeft;
          const walk = (x - startX) * 3; 
          container.scrollLeft = scrollLeft - walk;
        };

        container.addEventListener("mousedown", handleMouseDown);
        container.addEventListener("mouseleave", handleMouseLeave);
        container.addEventListener("mouseup", handleMouseUp);
        container.addEventListener("mousemove", handleMouseMove);

        return () => {
          container.removeEventListener("mousedown", handleMouseDown);
          container.removeEventListener("mouseleave", handleMouseLeave);
          container.removeEventListener("mouseup", handleMouseUp);
          container.removeEventListener("mousemove", handleMouseMove);
        };
      }
    }, []);


  return (
    <div
      // className="stats bg-yellow-200 flex gap-4 w-full overflow-auto max-w-[100vw] p-1 unselectableCss"
      className="stats flex max-w-[1100px] gap-4 w-full overflow-auto p-1 unselectableCss"
      ref={containerRef}
    >
      <Stats
        Item={{
          id: 1,
          title: t("total_users"),
          icon: BsPeopleFill,
          number: 1200,
          growth: 15,
          state: "up",
          from: "Last Month",
          color: "#FFC107",
          bgColor: "#FFF3E0",
        }}
      />
      <Stats
        Item={{
          id: 2,
          title: t("total_boats"),
          icon: MdDirectionsBoat,
          number: 300,
          growth: 10,
          state: "up",
          from: "Last Month",
          color: "#FF5722",
          bgColor: "#FFCCBC",
        }}
      />
      <Stats
        Item={{
          id: 3,
          title: t("total_inquiries"),
          icon: BsQuestionCircleFill,
          number: 450,
          growth: 20,
          state: "up",
          from: "Last Month",
          color: "#4CAF50",
          bgColor: "#C8E6C9",
        }}
      />
      <Stats
        Item={{
          id: 4,
          title: t("total_trips"),
          icon: BsFillCalendarCheckFill,
          number: 150,
          growth: 5,
          state: "down",
          from: "Last Month",
          color: "#2196F3",
          bgColor: "#BBDEFB",
        }}
      />
    </div>
  );
}

export default statsCont
