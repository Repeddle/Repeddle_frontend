import { useEffect, useState } from "react";
import Table from "../../components/table/Table";
import useReport from "../../hooks/useReport";
import { imageUrl } from "../../services/api";
import { Link } from "react-router-dom";
import moment from "moment";
import { FaArrowRight } from "react-icons/fa";
import ReportItem from "../../components/Report";

const headers = [
  { title: "ID", hide: true },
  { title: "Reporter" },
  { title: "Priority", hide: true },
  { title: "Reason", hide: true },
  { title: "Status", hide: true },
  { title: "Date", hide: true },
];

function Report() {
  const { reports, fetchReports } = useReport();
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const [currentReportId, setCurrentReportId] = useState<string | null>(null);

  const [debouncedQuery, setDebouncedQuery] = useState(search);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(search);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [search]);

  useEffect(() => {
    fetchReports({ search: debouncedQuery, status });
  }, [debouncedQuery, status]);

  return (
    <div className="flex-[4] overflow-x-hidden mb-5 min-h-[85vh] lg:mx-5 lg:my-0 bg-light-ev1 dark:bg-dark-ev1 rounded-[0.2rem] mx-[5px] my-5">
      <h1 className="pt-5 pb-0 px-5 text-[calc(1.375rem_+_1.5vw)] font-medium leading-tight mb-2">
        Report List
      </h1>
      <div className="flex flex-col md:flex-row gap-4 px-5 mb-5 justify-end">
        <select
          className="h-[45px] px-3 border border-malon-color focus-visible:outline focus-visible:outline-orange-color rounded-[5px] text-black dark:text-white bg-white dark:bg-black cursor-pointer"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="">All Status</option>
          <option value="open">Open</option>
          <option value="pending">Pending</option>
          <option value="on hold">On Hold</option>
          <option value="Closed">Closed</option>
        </select>
        <input
          className="w-full md:w-2/5 h-[45px] px-3 border border-malon-color focus-visible:outline focus-visible:outline-orange-color rounded-[5px] placeholder:p-2.5 text-black dark:text-white bg-white dark:bg-black"
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by reporter username"
          type="search"
          value={search}
        />
      </div>
      <Table
        headers={headers}
        message={reports.length <= 0 ? "No report available" : undefined}
        error={""}
        itemName="reports"
        totalPages={1}
        currentPage={page}
        onPageChange={setPage}
        totalCount={reports.length}
        body={reports.map((report) => ({
          key: report._id,
          keys: {
            ID: report._id,
            Reporter: (
              <div className="flex gap-2.5 items-center">
                <img
                  className="w-8 h-8 object-cover rounded-[50%]"
                  src={imageUrl + report.reporterId.image}
                  alt={report.reporterId.username}
                />
                <Link
                  to={`/user/${report.reporterId.username}`}
                  className="flex-1 whitespace-nowrap overflow-hidden text-ellipsis hover:underline"
                >
                  {report.reporterId.username}
                </Link>
              </div>
            ),
            Priority: report.priority,
            Reason: report.reason,
            Status: (
              <span
                className={
                  report.status === "open"
                    ? "text-green-color"
                    : report.status === "pending"
                    ? "text-orange-color"
                    : report.status === "on hold"
                    ? "text-purple-500"
                    : "text-blue-600"
                }
              >
                {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
              </span>
            ),
            Date: moment(report.createdAt).format("MMM DD YY, h:mm a"),
          },
          action: (
            <FaArrowRight
              onClick={() => {
                setCurrentReportId(report._id);
              }}
            />
          ),
        }))}
      />
      <ReportItem
        reportId={currentReportId}
        onClose={() => {
          setCurrentReportId(null);
        }}
      />
    </div>
  );
}

export default Report;
