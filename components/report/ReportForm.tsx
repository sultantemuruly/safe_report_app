"use client";

import { useState, useCallback } from "react";
import { Button } from "../ui/button";
import { ShieldAlert, Siren } from "lucide-react";
import { ClipLoader } from "react-spinners";
import crypto from "crypto";
import axios from "axios";

const ReportTypes = [
  "Theft",
  "Fire Outbreak",
  "Medical Emergency",
  "Natural Disaster",
  "Violence",
  "Power Outage",
  "Gas Leak",
  "Explosion",
  "Building Collapse",
  "Chemical Spill",
  "Other",
] as const;

type ReportType = "EMERGENCY" | "NON_EMERGENCY";

interface ReportFormProps {
  onComplete: (data: any) => void;
}

interface FormData {
  incidentType: ReportType;
  specificType: string;
  description: string;
  title: string;
}

export default function ReportForm({ onComplete }: ReportFormProps) {
  const [formData, setFormData] = useState<FormData>({
    incidentType: "" as ReportType,
    specificType: "",
    description: "",
    title: "",
  });
  const [image, setImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsAnalyzing(true);

    try {
      const base64 = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(file);
      });

      const response = await axios.post<{
        title: string;
        description: string;
        reportType: ReportType;
      }>(
        "/api/analyze-image",
        { image: base64 },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      const data = await response.data;

      if (data.title && data.description && data.reportType) {
        setFormData((prev) => ({
          ...prev,
          title: data.title,
          description: data.description,
          incidentType: data.reportType,
        }));
        setImage(base64 as string);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const generateReportId = useCallback(() => {
    const timestamp = Date.now().toString();
    const randomBytes = crypto.randomBytes(16).toString("hex");
    const combinedString = `${timestamp}-${randomBytes}`;

    return crypto
      .createHash("sha256")
      .update(combinedString)
      .digest("hex")
      .slice(0, 16);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const reportData = {
        reportId: generateReportId(),
        type: formData.incidentType,
        specificType: formData.specificType,
        title: formData.title,
        description: formData.description,
        image: image,
        status: "PENDING",
      };

      const response = await axios.post<{ result: string }>(
        "/api/reports/create",
        { reportData },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      const result = await response.data;

      if (!result) {
        throw new Error("Failed to submit report");
      }

      onComplete(result);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="space-y-8" onSubmit={handleSubmit}>
      {/* Emergency Type Selection */}
      <div className="grid grid-cols-2 gap-4">
        <Button
          type="button"
          onClick={() =>
            setFormData((prev) => ({ ...prev, incidentType: "EMERGENCY" }))
          }
          className={`h-[128px] p-6 rounded-2xl border-2 transition-all duration-20 ${
            formData.incidentType === "EMERGENCY"
              ? "bg-red-500/20 border-red-500 shadow-lg shadow-red-500/20"
              : "bg-zinc-900/50 border-zinc-800 hover:bg-red-500/10 hover:border-red-500/50"
          }
          `}
        >
          <div className="flex flex-col items-center space-y-2">
            <ShieldAlert />
            <span className="text-xl font-medium text-red-500">Emergency</span>
            <span className="text-lg text-zinc-500">General Report</span>
          </div>
        </Button>

        <Button
          type="button"
          onClick={() =>
            setFormData((prev) => ({ ...prev, incidentType: "NON_EMERGENCY" }))
          }
          className={`h-[128px] rounded-2xl border-2 transition-all duration-20 ${
            formData.incidentType === "NON_EMERGENCY"
              ? "bg-yellow-500/20 border-yellow-500 shadow-lg shadow-red-500/20"
              : "bg-zinc-900/50 border-zinc-800 hover:bg-yellow-500/10 hover:border-yellow-500/50"
          }`}
        >
          <div className="flex flex-col items-center space-y-2">
            <Siren />
            <span className="text-xl font-medium text-yellow-500">
              Non-Emergency
            </span>
            <span className="text-lg text-zinc-500">Immediate Response</span>
          </div>
        </Button>
      </div>

      {/* image upload */}
      <div className="relative group ">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
          id="image-upload"
          required
        />
        <label
          htmlFor="image-upload"
          className="block w-full p-8 border-2 border-dashed border-zinc-700 rounded-2xl 
                   hover:border-green-500/50 hover:bg-sky-500/5 transition-all duration-200
                   cursor-pointer text-center"
        >
          {image ? (
            <div className="space-y-4">
              <div className="w-full h-48 relative rounded-lg overflow-hidden">
                <img
                  src={image}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-sm text-zinc-400">Click to change image</p>
            </div>
          ) : (
            <div className="space-y-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-image mx-auto"
              >
                <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                <circle cx="9" cy="9" r="2" />
                <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
              </svg>
              <p className="text-sm text-zinc-400">
                Drop an image here to upload
              </p>
            </div>
          )}
        </label>

        {isAnalyzing && (
          <div className="absolute inset-0 bg-black/50 rounded-2xl flex items-center justify-center">
            <div className="flex items-center space-x-3">
              <ClipLoader color="#0df122" />
              <span className="text-sky-500 font-medium">
                Analyzing image...
              </span>
            </div>
          </div>
        )}
      </div>

      {/* specific report type */}
      <div>
        <label className="block text-sm font-medium text-zinc-400 mb-2">
          Incident Type
        </label>
        <select
          value={formData.specificType}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, specificType: e.target.value }))
          }
          className="w-full rounded-xl bg-zinc-900/50 border border-zinc-800 px-4 py-3.5
                   text-white transition-colors duration-200
                   focus:outline-none focus:ring-2 focus:ring-green-500/40"
          required
        >
          <option value="">Select</option>
          {ReportTypes.map((type, id) => (
            <option key={id} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      {/* Title */}
      <div>
        <label className="block text-sm font-medium text-zinc-400 mb-2">
          Report Title
        </label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, title: e.target.value }))
          }
          className="w-full rounded-xl bg-zinc-900/50 border border-zinc-800 px-4 py-3.5
                   text-white transition-colors duration-200
                   focus:outline-none focus:ring-2 focus:ring-green-500/40"
          required
        />
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-zinc-400 mb-2">
          Description
        </label>
        <textarea
          value={formData.description}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, description: e.target.value }))
          }
          rows={4}
          className="w-full rounded-xl bg-zinc-900/50 border border-zinc-800 px-4 py-3.5
                   text-white transition-colors duration-200
                   focus:outline-none focus:ring-2 focus:ring-green-500/40"
          required
        />
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full relative group overflow-hidden rounded-xl bg-green-500
                 px-4 py-3.5 text-sm font-medium text-white shadow-lg
                 transition-all duration-200
                 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <div className="relative flex items-center justify-center gap-2">
          {isSubmitting ? (
            <>
              <ClipLoader color="#0df122" />
            </>
          ) : (
            <>
              <span>Submit Report</span>
              <svg
                className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </>
          )}
        </div>
      </Button>
    </form>
  );
}
