import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from "recharts";
import useTheme from "../hooks/useTheme";

type Props = {
  title: string;
  total?: string | number;
  dataKey: string;
  grid?: boolean;
  data: { [key: string]: number | string }[];
  dataKeyX?: string;
};

const Chart = ({ title, total, dataKey, grid, data, dataKeyX }: Props) => {
  const { isDarkMode } = useTheme();
  console.log(title, data);
  return (
    <div className="h-[200px] lg:h-[300px] p-5 bg-light-ev1 dark:bg-dark-ev1 rounded-[0.2rem]">
      <div className="flex items-center">
        <h3 className="text-[calc(1.3rem_+_0.6vw)]">{title}</h3>
        <div className="text-lg ml-[15px]">{total}</div>
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <XAxis
            dataKey={dataKeyX ? dataKeyX : "name"}
            stroke="var(--orange-color)"
          />
          <Line
            type="monotone"
            dataKey={dataKey}
            stroke="var(--orange-color)"
          />
          <Tooltip />
          {grid && (
            <CartesianGrid
              stroke={isDarkMode ? "var(--dark-ev2)" : "var(--light-ev3)"}
            />
          )}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
