import { useState, useEffect, useContext } from "react";
import ThemeContext from "../../context/ThemeContext";
import moderationService from "../../services/moderation";
import { RestrictedWord } from "../../types/moderation";
import {
  FaTrash,
  FaPlus,
  FaUpload,
  FaCheck,
  FaBan,
  FaSearch,
} from "react-icons/fa";
import useToastNotification from "../../hooks/useToastNotification";
import moment from "moment";

const Moderation = () => {
  const theme = useContext(ThemeContext);
  const { addNotification } = useToastNotification();
  const [activeTab, setActiveTab] = useState<
    "restricted-words" | "content-moderation"
  >("restricted-words");
  const [restrictedWords, setRestrictedWords] = useState<RestrictedWord[]>([]);
  const [loading, setLoading] = useState(false);
  const [newWord, setNewWord] = useState("");
  const [bulkWords, setBulkWords] = useState("");
  const [showBulkModal, setShowBulkModal] = useState(false);

  // Content Moderation matching state
  const [targetType, setTargetType] = useState<
    "product" | "review" | "comment" | "reply"
  >("product");
  const [targetId, setTargetId] = useState("");
  const [moderationStatus, setModerationStatus] = useState<
    "approved" | "flagged" | "pending_review"
  >("approved");

  useEffect(() => {
    if (activeTab === "restricted-words") {
      loadRestrictedWords();
    }
  }, [activeTab]);

  const loadRestrictedWords = async () => {
    try {
      setLoading(true);
      const response = await moderationService.getRestrictedWords();
      if (response.status) {
        setRestrictedWords(response.data);
      }
    } catch (error) {
      console.error("Failed to load restricted words", error);
      addNotification("Failed to load restricted words", undefined, true);
    } finally {
      setLoading(false);
    }
  };

  const handleAddWord = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newWord.trim()) return;

    try {
      const response = await moderationService.addRestrictedWord(
        newWord.trim()
      );
      if (response.status) {
        addNotification("Word added successfully");
        setNewWord("");
        loadRestrictedWords();
      }
    } catch (error: any) {
      addNotification(
        error.response?.data?.message || "Failed to add word",
        undefined,
        true
      );
    }
  };

  const handleBulkAdd = async () => {
    const words = bulkWords
      .split(/[\n,]/)
      .map((w) => w.trim())
      .filter((w) => w.length > 0);

    if (words.length === 0) return;

    try {
      const response = await moderationService.bulkAddRestrictedWords(words);
      if (response.status) {
        addNotification(`${response.insertedCount} words added successfully`);
        setBulkWords("");
        setShowBulkModal(false);
        loadRestrictedWords();
      }
    } catch (error: any) {
      console.error("Failed to bulk add words", error);
      addNotification(
        error.response?.data?.message || "Failed to bulk add words",
        undefined,
        true
      );
    }
  };

  const handleRemoveWord = async (id: string) => {
    if (!window.confirm("Are you sure you want to remove this word?")) return;

    try {
      const response = await moderationService.removeRestrictedWord(id);
      if (response.status) {
        addNotification("Word removed successfully");
        loadRestrictedWords();
      }
    } catch (error) {
      addNotification("Failed to remove word", undefined, true);
    }
  };

  const handleUpdateStatus = async () => {
    if (!targetId) {
      addNotification("Please provide a target ID", undefined, true);
      return;
    }

    try {
      setLoading(true);
      const response = await moderationService.updateModerationStatus({
        targetType,
        targetId,
        status: moderationStatus,
      });
      if (response.status) {
        addNotification(`Status updated to ${moderationStatus}`);
        setTargetId("");
      }
    } catch (error: any) {
      addNotification(
        error.response?.data?.message || "Failed to update status",
        undefined,
        true
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`p-6 min-h-[85vh] ${
        theme?.isDarkMode ? "text-white" : "text-black"
      }`}
    >
      <h1 className="text-3xl font-bold mb-8">Admin Moderation</h1>

      {/* Tabs */}
      <div className="flex border-b border-gray-300 dark:border-gray-700 mb-8">
        <button
          className={`pb-2 px-4 font-semibold transition-colors ${
            activeTab === "restricted-words"
              ? "border-b-2 border-malon-color text-malon-color"
              : "text-gray-500 hover:text-malon-color"
          }`}
          onClick={() => setActiveTab("restricted-words")}
        >
          Restricted Words
        </button>
        <button
          className={`pb-2 px-4 font-semibold transition-colors ${
            activeTab === "content-moderation"
              ? "border-b-2 border-malon-color text-malon-color"
              : "text-gray-500 hover:text-malon-color"
          }`}
          onClick={() => setActiveTab("content-moderation")}
        >
          Manual Content Moderation
        </button>
      </div>

      {activeTab === "restricted-words" ? (
        <div className="space-y-8">
          {/* Add Word Form */}
          <div
            className={`p-6 rounded-lg shadow-md border ${
              theme?.isDarkMode
                ? "bg-dark-ev1 border-gray-700"
                : "bg-white border-gray-200"
            }`}
          >
            <h2 className="text-xl font-bold mb-4">Add Restricted Word</h2>
            <form
              onSubmit={handleAddWord}
              className="flex flex-col sm:flex-row gap-4"
            >
              <input
                type="text"
                value={newWord}
                onChange={(e) => setNewWord(e.target.value)}
                placeholder="Enter word or phrase"
                className={`flex-1 p-3 rounded border ${
                  theme?.isDarkMode
                    ? "bg-gray-800 border-gray-700"
                    : "bg-white border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-malon-color`}
              />
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="bg-malon-color text-white px-6 py-3 rounded hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                >
                  <FaPlus /> Add Word
                </button>
                <button
                  type="button"
                  onClick={() => setShowBulkModal(true)}
                  className="border border-malon-color text-malon-color px-6 py-3 rounded hover:bg-malon-color hover:text-white transition-all flex items-center justify-center gap-2"
                >
                  <FaUpload /> Bulk Add
                </button>
              </div>
            </form>
          </div>

          {/* Words Table */}
          <div
            className={`rounded-lg shadow-md border overflow-hidden ${
              theme?.isDarkMode
                ? "bg-dark-ev1 border-gray-700"
                : "bg-white border-gray-200"
            }`}
          >
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead
                  className={`bg-opacity-10 ${
                    theme?.isDarkMode
                      ? "bg-white text-gray-300"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  <tr>
                    <th className="p-4">Word</th>
                    <th className="p-4">Created At</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan={3} className="p-8 text-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-malon-color mx-auto"></div>
                      </td>
                    </tr>
                  ) : restrictedWords.length === 0 ? (
                    <tr>
                      <td colSpan={3} className="p-8 text-center text-gray-500">
                        No restricted words found
                      </td>
                    </tr>
                  ) : (
                    restrictedWords.map((word) => (
                      <tr
                        key={word._id}
                        className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                      >
                        <td className="p-4 font-medium">{word.word}</td>
                        <td className="p-4 text-gray-500">
                          {moment(word.createdAt).format("MMM DD, YYYY h:mm A")}
                        </td>
                        <td className="p-4 text-right">
                          <button
                            onClick={() => handleRemoveWord(word._id)}
                            className="text-red-500 hover:text-red-700 p-2 transition-colors"
                            title="Delete Word"
                          >
                            <FaTrash />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <div className="max-w-2xl">
          {/* Content Moderation Form */}
          <div
            className={`p-6 rounded-lg shadow-md border ${
              theme?.isDarkMode
                ? "bg-dark-ev1 border-gray-700"
                : "bg-white border-gray-200"
            }`}
          >
            <h2 className="text-xl font-bold mb-6">
              Update Content Moderation Status
            </h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Target Type
                </label>
                <select
                  value={targetType}
                  onChange={(e) => setTargetType(e.target.value as any)}
                  className={`w-full p-3 rounded border ${
                    theme?.isDarkMode
                      ? "bg-gray-800 border-gray-700"
                      : "bg-white border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-malon-color`}
                >
                  <option value="product">Product</option>
                  <option value="review">Review</option>
                  <option value="comment">Comment</option>
                  <option value="reply">Reply</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  Target ID
                </label>
                <input
                  type="text"
                  value={targetId}
                  onChange={(e) => setTargetId(e.target.value)}
                  placeholder="Paste the MongoDB ID of the item"
                  className={`w-full p-3 rounded border ${
                    theme?.isDarkMode
                      ? "bg-gray-800 border-gray-700"
                      : "bg-white border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-malon-color font-mono`}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  New Status
                </label>
                <div className="grid grid-cols-3 gap-3">
                  <button
                    onClick={() => setModerationStatus("approved")}
                    className={`p-3 rounded border flex flex-col items-center gap-2 transition-all ${
                      moderationStatus === "approved"
                        ? "bg-green-100 border-green-500 text-green-700 ring-2 ring-green-500 ring-opacity-50"
                        : "border-gray-300 dark:border-gray-700 hover:border-green-500"
                    }`}
                  >
                    <FaCheck />
                    <span>Approve</span>
                  </button>
                  <button
                    onClick={() => setModerationStatus("flagged")}
                    className={`p-3 rounded border flex flex-col items-center gap-2 transition-all ${
                      moderationStatus === "flagged"
                        ? "bg-red-100 border-red-500 text-red-700 ring-2 ring-red-500 ring-opacity-50"
                        : "border-gray-300 dark:border-gray-700 hover:border-red-500"
                    }`}
                  >
                    <FaBan />
                    <span>Flag</span>
                  </button>
                  <button
                    onClick={() => setModerationStatus("pending_review")}
                    className={`p-3 rounded border flex flex-col items-center gap-2 transition-all ${
                      moderationStatus === "pending_review"
                        ? "bg-orange-100 border-orange-500 text-orange-700 ring-2 ring-orange-500 ring-opacity-50"
                        : "border-gray-300 dark:border-gray-700 hover:border-orange-500"
                    }`}
                  >
                    <FaSearch />
                    <span>Pending</span>
                  </button>
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={handleUpdateStatus}
                  disabled={loading || !targetId}
                  className="w-full bg-malon-color text-white font-bold py-4 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                >
                  {loading ? "Processing..." : "Apply Status Change"}
                </button>
                <p className="mt-4 text-sm text-gray-500 italic">
                  Note: Custom approval for products automatically sets them as
                  active and available. Approving/Flagging also closes all
                  related reports.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bulk Add Modal */}
      {showBulkModal && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-[100] p-4">
          <div
            className={`w-full max-w-xl p-6 rounded-xl shadow-2xl ${
              theme?.isDarkMode ? "bg-dark-ev1" : "bg-white"
            }`}
          >
            <h2 className="text-xl font-bold mb-4">
              Bulk Add Restricted Words
            </h2>
            <p className="text-sm text-gray-500 mb-4">
              Enter words separated by commas or new lines. Duplicate words will
              be skipped.
            </p>
            <textarea
              value={bulkWords}
              onChange={(e) => setBulkWords(e.target.value)}
              placeholder="word1, word2, word3..."
              className={`w-full h-48 p-4 rounded border mb-6 ${
                theme?.isDarkMode
                  ? "bg-gray-800 border-gray-700"
                  : "bg-white border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-malon-color`}
            />
            <div className="flex gap-4">
              <button
                onClick={handleBulkAdd}
                className="flex-1 bg-malon-color text-white font-bold py-3 rounded hover:opacity-90 transition-opacity"
              >
                Add All Words
              </button>
              <button
                onClick={() => setShowBulkModal(false)}
                className="flex-1 border border-gray-300 dark:border-gray-700 font-bold py-3 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Moderation;
