import { format, formatDistance } from 'date-fns';
import es from 'date-fns/locale/es';

interface IProps {
  timestamp: string;
}

const DateTooltip = ({ timestamp }: IProps) => {
  return (
    <div className="relative">
      <span className="peer text-sm self-start text-gray-500">
        {formatCreatedAtDate(timestamp)}
      </span>
      <span className="invisible peer-hover:visible opacity-0 peer-hover:opacity-100 transition-opacity absolute bottom-6 bg-black rounded shadow text-white px-1 py-0.5 whitespace-nowrap right-0 text-xs">
        {format(new Date(timestamp), "d 'de' MMMM 'de' yyyy 'a las' HH:MM", {
          locale: es,
        })}
      </span>
    </div>
  );
};

const formatCreatedAtDate = (date: string) => {
  const now = new Date();
  const createdAt = new Date(date);

  return formatDistance(createdAt, now, { locale: es, addSuffix: true });
};

export default DateTooltip;
