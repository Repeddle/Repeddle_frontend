import { IReport } from "../types/report";
import { imageUrl } from "../services/api";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import useReport from "../hooks/useReport";
import ThemeContext from "../context/ThemeContext";
import { updateReport } from "../services/report";
import moderationService from "../services/moderation";
import useToastNotification from "../hooks/useToastNotification";
import {
  FaTimes,
  FaUser,
  FaEnvelope,
  FaCalendar,
  FaExclamationTriangle,
  FaFlag,
  FaInfoCircle,
  FaComments,
  FaBox,
  FaEdit,
  FaSave,
  FaCheck,
  FaBan,
} from "react-icons/fa";

interface ReportedItemDetails {
  type: string;
  data: any;
}

function ReportItem({
  reportId,
  onClose,
}: {
  reportId: string | null;
  onClose: () => void;
}) {
  const navigate = useNavigate();
  const theme = useContext(ThemeContext);
  const [report, setReport] = useState<IReport | null>(null);
  const [reportedItem, setReportedItem] = useState<ReportedItemDetails | null>(
    null
  );
  const [fetchingReport, setFetchingReport] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Admin Notes State
  const [adminNotes, setAdminNotes] = useState("");
  const [isEditingNotes, setIsEditingNotes] = useState(false);
  const [savingNotes, setSavingNotes] = useState(false);
  const [updatingStatus, setUpdatingStatus] = useState(false);

  const { fetchReport, fetchReports } = useReport();
  const { addNotification } = useToastNotification();

  useEffect(() => {
    if (reportId) {
      loadReport();
      setTimeout(() => setIsVisible(true), 10);
    } else {
      setIsVisible(false);
    }
  }, [reportId]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => onClose(), 300);
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  const loadReport = async () => {
    if (!reportId) return;

    try {
      setFetchingReport(true);
      const reportData = await fetchReport(reportId);
      setReport(reportData);
      setAdminNotes(reportData.adminNotes || "");

      if (reportData.targetId && reportData.targetType) {
        setReportedItem({
          type: reportData.targetType,
          data: reportData.targetId,
        });
      }
    } catch (error) {
      console.error("Error fetching report:", error);
    } finally {
      setFetchingReport(false);
    }
  };

  const handleSaveAdminNotes = async () => {
    if (!report || !reportId) return;

    try {
      setSavingNotes(true);
      const updatedReport = await updateReport({
        id: reportId,
        data: { adminNotes },
      });
      setReport(updatedReport);
      setIsEditingNotes(false);
    } catch (error) {
      console.error("Error saving admin notes:", error);
    } finally {
      setSavingNotes(false);
    }
  };

  const handleUpdateStatus = async () => {
    if (!report || !reportId) return;

    try {
      setUpdatingStatus(true);
      const updatedReport = await updateReport({
        id: reportId,
        data: { status: "Closed" },
      });
      setReport(updatedReport);
      setUpdatingStatus(false);
      fetchReports({});
      addNotification("Report marked as resolved");
    } catch (error) {
      console.error("Error updating status:", error);
      addNotification("Failed to update report status", undefined, true);
    } finally {
      setUpdatingStatus(false);
    }
  };

  const handleModerationAction = async (status: "approved" | "flagged") => {
    if (!report) return;

    try {
      setUpdatingStatus(true);
      const targetIdToUse =
        typeof report.targetId === "string"
          ? report.targetId
          : (report.targetId as any)._id;

      const response = await moderationService.updateModerationStatus({
        targetType: report.targetType as any,
        targetId: targetIdToUse,
        status: status,
      });

      if (response.status) {
        addNotification(`Content successfully ${status}`);
        // Refresh report as it should be closed now according to backend behavior
        loadReport();
        fetchReports({});
      }
    } catch (error: any) {
      console.error(`Error ${status} content:`, error);
      addNotification(
        error.response?.data?.message || `Failed to ${status} content`,
        undefined,
        true
      );
    } finally {
      setUpdatingStatus(false);
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case "high":
        return "text-red-600 bg-red-50";
      case "medium":
        return "text-yellow-600 bg-yellow-50";
      case "low":
        return "text-green-600 bg-green-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "open":
        return "text-green-600 bg-green-50";
      case "pending":
        return "text-yellow-600 bg-yellow-50";
      case "on hold":
        return "text-purple-600 bg-purple-50";
      case "closed":
        return "text-gray-600 bg-gray-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  const renderReportedItemDetails = () => {
    if (!reportedItem) return null;

    const { type, data } = reportedItem;

    switch (type.toLowerCase()) {
      case "product":
        return (
          <div
            className={`rounded-lg p-5 border cursor-pointer hover:opacity-90 ${
              theme?.isDarkMode ? "border-gray-700" : "border-gray-200"
            }`}
            onClick={() => navigate(`/product/${data.slug}`)}
          >
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <FaBox className="text-malon-color" />
              Reported Product
            </h3>
            <div className="flex items-start gap-4">
              {data.images && data.images[0] && (
                <img
                  src={imageUrl + data.images[0]}
                  alt={data.name}
                  className="w-24 h-24 rounded-lg object-cover border-2 border-white shadow-md"
                />
              )}
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="font-semibold">Name:</span>
                  <span>{data.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold">Price:</span>
                  <span>₦{data.sellingPrice?.toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold">Seller:</span>
                  <span>{data.seller?.username}</span>
                </div>
                {data.description && (
                  <div className="mt-2">
                    <span className="font-semibold">Description:</span>
                    <p className="text-sm mt-1 line-clamp-3">
                      {data.description}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      case "user":
        return (
          <div
            className={`rounded-lg p-5 border cursor-pointer hover:opacity-90 ${
              theme?.isDarkMode ? "border-gray-700" : "border-gray-200"
            }`}
            onClick={() => navigate(`/dashboard/user/${data._id}`)}
          >
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <FaUser className="text-malon-color" />
              Reported User
            </h3>
            <div className="flex items-start gap-4">
              <img
                src={imageUrl + data.image}
                alt={data.username}
                className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-md"
              />
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="font-semibold">Username:</span>
                  <span>{data.username}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold">Email:</span>
                  <span>{data.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold">Role:</span>
                  <span className="capitalize">{data.role}</span>
                </div>
              </div>
            </div>
          </div>
        );

      case "comment":
      case "reply":
        return (
          <div
            className={`rounded-lg p-5 border ${
              theme?.isDarkMode ? "border-gray-700" : "border-gray-200"
            }`}
          >
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <FaInfoCircle className="text-malon-color" />
              Reported {type === "comment" ? "Comment" : "Reply"}
            </h3>
            <div className="space-y-3">
              <div>
                <span className="font-semibold">Author:</span>
                <span className="ml-2">
                  {data.userId?.username || "Unknown"}
                </span>
              </div>
              <div>
                <span className="font-semibold">Content:</span>
                <p
                  className={`mt-1 p-3 rounded border ${
                    theme?.isDarkMode ? "border-gray-700" : "border-gray-200"
                  }`}
                >
                  {data.comment}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold">Posted:</span>
                <span>
                  {moment(data.createdAt).format("MMMM DD, YYYY [at] h:mm A")}
                </span>
              </div>
            </div>
          </div>
        );

      case "review":
        return (
          <div
            className={`rounded-lg p-5 border ${
              theme?.isDarkMode ? "border-gray-700" : "border-gray-200"
            }`}
          >
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <FaInfoCircle className="text-malon-color" />
              Reported Review
            </h3>
            <div className="space-y-3">
              <div>
                <span className="font-semibold">Reviewer:</span>
                <span className="ml-2">{data.user?.username || "Unknown"}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold">Rating:</span>
                <span>{data.rating}/5 ⭐</span>
              </div>
              <div>
                <span className="font-semibold">Comment:</span>
                <p
                  className={`mt-1 p-3 rounded border ${
                    theme?.isDarkMode ? "border-gray-700" : "border-gray-200"
                  }`}
                >
                  {data.comment}
                </p>
              </div>
            </div>
          </div>
        );

      case "message":
      case "conversation":
        return (
          <div
            className={`rounded-lg p-5 border cursor-pointer hover:opacity-90 ${
              theme?.isDarkMode ? "border-gray-700" : "border-gray-200"
            }`}
            onClick={() => navigate(`/messages?conversation=${data._id}`)}
          >
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <FaComments className="text-malon-color" />
              Reported {type === "message" ? "Message" : "Conversation"}
            </h3>
            <div className="space-y-3">
              {type === "message" && (
                <>
                  <div>
                    <span className="font-semibold">From:</span>
                    <span className="ml-2">{data.sender || "Unknown"}</span>
                  </div>
                  <div>
                    <span className="font-semibold">Content:</span>
                    <p
                      className={`mt-1 p-3 rounded border ${
                        theme?.isDarkMode
                          ? "border-gray-700"
                          : "border-gray-200"
                      }`}
                    >
                      {data.content}
                    </p>
                  </div>
                </>
              )}
              {type === "conversation" && (
                <div>
                  <span className="font-semibold">Participants:</span>
                  <span className="ml-2">
                    {data.participants?.length || 0} users
                  </span>
                </div>
              )}
            </div>
          </div>
        );

      default:
        return (
          <div
            className={`rounded-lg p-5 border ${
              theme?.isDarkMode ? "border-gray-700" : "border-gray-200"
            }`}
          >
            <h3 className="text-lg font-semibold mb-2">Reported Item</h3>
            <p>Type: {type}</p>
            <pre className="text-xs mt-2 overflow-auto max-h-40">
              {JSON.stringify(data, null, 2)}
            </pre>
          </div>
        );
    }
  };

  if (!reportId) {
    return null;
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/80 transition-opacity duration-300 z-10 ${
          isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={handleBackdropClick}
      />

      {/* Slide-in Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full md:w-[600px] lg:w-[700px] ${
          theme?.isDarkMode ? "bg-main-dark-bg" : "bg-white"
        } ${
          theme?.isDarkMode
            ? "shadow-[0_5px_16px_rgba(225,225,225,0.2)]"
            : "shadow-[0_5px_16px_rgba(0,0,0,0.2)]"
        } transform transition-transform duration-300 ease-in-out z-50 ${
          isVisible ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="sticky top-0 bg-malon-color text-white px-6 py-4 flex justify-between items-center z-10">
          <h2 className="text-2xl font-bold">Report Details</h2>
          <button
            onClick={handleClose}
            className="text-white hover:bg-white/20 rounded-full p-2 transition-colors"
            aria-label="Close"
          >
            <FaTimes size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="h-[calc(100%-72px)] overflow-y-auto">
          {fetchingReport ? (
            <div className="flex items-center justify-center h-full">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-malon-color"></div>
              <span className="ml-3">Loading report...</span>
            </div>
          ) : !report ? (
            <div className="flex items-center justify-center h-full">
              <p className="text-center">Report not found</p>
            </div>
          ) : (
            <div className="p-6 space-y-6">
              {/* Reporter Information */}
              <div
                className={`rounded-lg p-5 border ${
                  theme?.isDarkMode ? "border-gray-700" : "border-gray-200"
                }`}
              >
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <FaUser className="text-malon-color" />
                  Reporter Information
                </h3>
                <div
                  className="flex items-start gap-4 cursor-pointer hover:opacity-90"
                  onClick={() =>
                    navigate(`/seller/${report.reporterId.username}`)
                  }
                >
                  <img
                    src={imageUrl + report.reporterId.image}
                    alt={report.reporterId.username}
                    className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-md"
                  />
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                      <FaUser className="text-gray-500 text-sm" />
                      <span className="font-semibold">Username:</span>
                      <span>{report.reporterId.username}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaEnvelope className="text-gray-500 text-sm" />
                      <span className="font-semibold">Email:</span>
                      <span>{report.reporterId.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">User ID:</span>
                      <span className="text-sm font-mono">
                        {report.reporterId._id}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Reported Item Details */}
              {renderReportedItemDetails()}

              {/* Report Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Reason */}
                <div
                  className={`border rounded-lg p-4 shadow-sm ${
                    theme?.isDarkMode ? "border-gray-700" : "border-gray-200"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <FaExclamationTriangle className="text-orange-500" />
                    <span className="font-semibold">Reason</span>
                  </div>
                  <p className="capitalize">{report.reason}</p>
                </div>

                {/* Priority */}
                <div
                  className={`border rounded-lg p-4 shadow-sm ${
                    theme?.isDarkMode ? "border-gray-700" : "border-gray-200"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <FaFlag className="text-red-500" />
                    <span className="font-semibold">Priority</span>
                  </div>
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${getPriorityColor(
                      report.priority
                    )}`}
                  >
                    {report.priority.charAt(0).toUpperCase() +
                      report.priority.slice(1)}
                  </span>
                </div>

                {/* Status */}
                <div
                  className={`border rounded-lg p-4 shadow-sm ${
                    theme?.isDarkMode ? "border-gray-700" : "border-gray-200"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <FaInfoCircle className="text-blue-500" />
                    <span className="font-semibold">Status</span>
                  </div>
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(
                      report.status
                    )}`}
                  >
                    {report.status.charAt(0).toUpperCase() +
                      report.status.slice(1)}
                  </span>
                </div>

                {/* Target Type */}
                <div
                  className={`border rounded-lg p-4 shadow-sm ${
                    theme?.isDarkMode ? "border-gray-700" : "border-gray-200"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-semibold">Target Type</span>
                  </div>
                  <p className="capitalize">{report.targetType}</p>
                </div>
              </div>

              {/* Description */}
              {report.description && (
                <div
                  className={`border rounded-lg p-4 shadow-sm ${
                    theme?.isDarkMode ? "border-gray-700" : "border-gray-200"
                  }`}
                >
                  <h4 className="font-semibold mb-2">Description</h4>
                  <p className="whitespace-pre-wrap">{report.description}</p>
                </div>
              )}

              {/* Report Image */}
              {report.image && (
                <div
                  className={`border rounded-lg p-4 shadow-sm ${
                    theme?.isDarkMode ? "border-gray-700" : "border-gray-200"
                  }`}
                >
                  <h4 className="font-semibold mb-3">Attached Image</h4>
                  <img
                    src={imageUrl + report.image}
                    alt="Report evidence"
                    className={`w-full max-h-96 object-contain rounded-lg border ${
                      theme?.isDarkMode ? "border-gray-700" : "border-gray-300"
                    }`}
                  />
                </div>
              )}

              {/* Timestamps */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div
                  className={`border rounded-lg p-4 shadow-sm ${
                    theme?.isDarkMode ? "border-gray-700" : "border-gray-200"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <FaCalendar className="text-green-500" />
                    <span className="font-semibold">Created At</span>
                  </div>
                  <p>
                    {moment(report.createdAt).format(
                      "MMMM DD, YYYY [at] h:mm A"
                    )}
                  </p>
                  <p className="text-sm mt-1 opacity-70">
                    {moment(report.createdAt).fromNow()}
                  </p>
                </div>

                <div
                  className={`border rounded-lg p-4 shadow-sm ${
                    theme?.isDarkMode ? "border-gray-700" : "border-gray-200"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <FaCalendar className="text-blue-500" />
                    <span className="font-semibold">Last Updated</span>
                  </div>
                  <p>
                    {moment(report.updatedAt).format(
                      "MMMM DD, YYYY [at] h:mm A"
                    )}
                  </p>
                  <p className="text-sm mt-1 opacity-70">
                    {moment(report.updatedAt).fromNow()}
                  </p>
                </div>
              </div>

              {/* Report ID */}
              <div
                className={`border rounded-lg p-4 shadow-sm ${
                  theme?.isDarkMode ? "border-gray-700" : "border-gray-200"
                }`}
              >
                <span className="font-semibold">Report ID:</span>
                <span className="text-sm font-mono ml-2">{report._id}</span>
              </div>

              {/* Admin Notes (Editable) */}
              <div
                className={`border rounded-lg p-4 shadow-sm ${
                  theme?.isDarkMode
                    ? "border-gray-700 bg-amber-900/20"
                    : "border-amber-200 bg-amber-50"
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-amber-800 flex items-center gap-2">
                    <FaInfoCircle />
                    Admin Notes
                  </h4>
                  {!isEditingNotes && (
                    <button
                      onClick={() => setIsEditingNotes(true)}
                      className="text-sm px-3 py-1 bg-malon-color text-white rounded hover:opacity-90 transition-opacity flex items-center gap-1"
                    >
                      <FaEdit size={12} />
                      {adminNotes ? "Edit" : "Add Notes"}
                    </button>
                  )}
                </div>
                {isEditingNotes ? (
                  <div className="space-y-3">
                    <textarea
                      value={adminNotes}
                      onChange={(e) => setAdminNotes(e.target.value)}
                      placeholder="Add admin notes about this report..."
                      className={`w-full min-h-[120px] p-3 rounded border ${
                        theme?.isDarkMode
                          ? "bg-gray-800 border-gray-700 text-white"
                          : "bg-white border-gray-300"
                      } focus:outline-none focus:ring-2 focus:ring-malon-color`}
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={handleSaveAdminNotes}
                        disabled={savingNotes}
                        className="px-4 py-2 bg-malon-color text-white rounded hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                      >
                        <FaSave size={14} />
                        {savingNotes ? "Saving..." : "Save Notes"}
                      </button>
                      <button
                        onClick={() => {
                          setAdminNotes(report?.adminNotes || "");
                          setIsEditingNotes(false);
                        }}
                        disabled={savingNotes}
                        className={`px-4 py-2 border rounded hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                          theme?.isDarkMode
                            ? "border-gray-700 hover:bg-gray-800"
                            : "border-gray-300"
                        }`}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <p className="text-amber-900 whitespace-pre-wrap">
                    {adminNotes ||
                      "No admin notes yet. Click 'Add Notes' to add notes about this report."}
                  </p>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4 border-t">
                <button
                  onClick={handleUpdateStatus}
                  disabled={updatingStatus || report.status === "Closed"}
                  className="flex-1 bg-gray-200 dark:bg-gray-700 hover:opacity-90 text-gray-800 dark:text-white font-semibold py-3 px-6 rounded-lg transition-opacity flex items-center justify-center gap-2 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FaCheck size={18} />
                  {updatingStatus ? "Updating..." : "Resolve Only"}
                </button>
                {report.targetType !== "user" && (
                  <>
                    <button
                      onClick={() => handleModerationAction("approved")}
                      disabled={updatingStatus || report.status === "Closed"}
                      className="flex-1 bg-green-600 hover:opacity-90 text-white font-semibold py-3 px-6 rounded-lg transition-opacity flex items-center justify-center gap-2 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <FaCheck size={18} />
                      Approve
                    </button>
                    <button
                      onClick={() => handleModerationAction("flagged")}
                      disabled={updatingStatus || report.status === "Closed"}
                      className="flex-1 bg-red-600 hover:opacity-90 text-white font-semibold py-3 px-6 rounded-lg transition-opacity flex items-center justify-center gap-2 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <FaBan size={18} />
                      Flag
                    </button>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default ReportItem;
