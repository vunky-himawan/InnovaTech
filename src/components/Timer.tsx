import Countdown from "react-countdown";

type Props = {
  date: string;
  timeZone: string;
};

const Timer = ({ date, timeZone }: Props) => {
  const options: any = {
    timeZone: timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: timeZone === "Asia/Jakarta" ? false : true,
  };

  const now = new Date();
  const start = new Date(date);
  const countdown = start.getTime() - now.getTime();

  return (
    <>
      <Countdown date={now.getTime() + countdown} renderer={renderer} />
    </>
  );
};

const renderer = ({ days, hours, minutes, seconds, completed }: any) => {
  return (
    <p className="font-medium text-xl">
      Will start in {days}d {hours}h {minutes}m {seconds}s
    </p>
  );
};

export default Timer;
