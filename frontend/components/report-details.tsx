"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { type HazardReport, hazardTypes } from "@/lib/dummy-data"
import { MapPin, Calendar, User, Camera, MessageSquare, CheckCircle, X, AlertTriangle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface ReportDetailsProps {
  report: HazardReport
}

export default function ReportDetails({ report }: ReportDetailsProps) {
  const [notes, setNotes] = useState("")
  const [status, setStatus] = useState(report.status)
  const [isUpdating, setIsUpdating] = useState(false)
  const { toast } = useToast()

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "low":
        return "text-green-600 bg-green-50 border-green-200"
      case "medium":
        return "text-yellow-600 bg-yellow-50 border-yellow-200"
      case "high":
        return "text-orange-600 bg-orange-50 border-orange-200"
      case "critical":
        return "text-red-600 bg-red-50 border-red-200"
      default:
        return "text-gray-600 bg-gray-50 border-gray-200"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "verified":
        return "text-green-600 bg-green-50 border-green-200"
      case "pending":
        return "text-yellow-600 bg-yellow-50 border-yellow-200"
      case "false_alarm":
        return "text-gray-600 bg-gray-50 border-gray-200"
      default:
        return "text-gray-600 bg-gray-50 border-gray-200"
    }
  }

  const handleStatusUpdate = async () => {
    setIsUpdating(true)

    try {
      // Mock API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Report updated",
        description: "The report status has been updated successfully.",
      })
    } catch (error) {
      toast({
        title: "Update failed",
        description: "Failed to update the report. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsUpdating(false)
    }
  }

  const addNote = async () => {
    if (!notes.trim()) return

    setIsUpdating(true)

    try {
      // Mock API call
      await new Promise((resolve) => setTimeout(resolve, 500))

      toast({
        title: "Note added",
        description: "Your note has been added to the report.",
      })

      setNotes("")
    } catch (error) {
      toast({
        title: "Failed to add note",
        description: "Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsUpdating(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Badge className={getSeverityColor(report.severity)}>{report.severity}</Badge>
          <Badge className={getStatusColor(status)}>{status}</Badge>
        </div>
        <h3 className="font-semibold text-lg">
          {hazardTypes.find((t) => t.value === report.type)?.label || report.type}
        </h3>
        <p className="text-sm text-muted-foreground">Report ID: {report.id}</p>
      </div>

      {/* Basic Info */}
      <div className="space-y-3">
        <div className="flex items-start gap-2">
          <MapPin className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm font-medium">Location</p>
            <p className="text-sm text-muted-foreground">{report.location.address}</p>
            <p className="text-xs text-muted-foreground">
              {report.location.lat.toFixed(4)}, {report.location.lng.toFixed(4)}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-2">
          <Calendar className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm font-medium">Reported</p>
            <p className="text-sm text-muted-foreground">{new Date(report.timestamp).toLocaleString()}</p>
          </div>
        </div>

        <div className="flex items-start gap-2">
          <User className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm font-medium">Reported By</p>
            <p className="text-sm text-muted-foreground">{report.reportedBy}</p>
            <Badge variant="outline" className="text-xs mt-1">
              {report.source}
            </Badge>
          </div>
        </div>
      </div>

      <Separator />

      {/* Description */}
      <div>
        <h4 className="font-medium mb-2">Description</h4>
        <p className="text-sm text-muted-foreground bg-muted p-3 rounded-lg">{report.description}</p>
      </div>

      {/* Media */}
      {report.media && report.media.length > 0 && (
        <div>
          <h4 className="font-medium mb-2 flex items-center">
            <Camera className="h-4 w-4 mr-2" />
            Media ({report.media.length})
          </h4>
          <div className="grid grid-cols-2 gap-2">
            {report.media.map((media, index) => (
              <div key={index} className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                <Camera className="h-8 w-8 text-muted-foreground" />
              </div>
            ))}
          </div>
        </div>
      )}

      <Separator />

      {/* Status Update */}
      <div className="space-y-3">
        <h4 className="font-medium">Update Status</h4>
        <div className="space-y-2">
          <Label>Status</Label>
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pending">
                <div className="flex items-center">
                  <AlertTriangle className="h-4 w-4 mr-2 text-yellow-600" />
                  Pending Review
                </div>
              </SelectItem>
              <SelectItem value="verified">
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                  Verified
                </div>
              </SelectItem>
              <SelectItem value="false_alarm">
                <div className="flex items-center">
                  <X className="h-4 w-4 mr-2 text-gray-600" />
                  False Alarm
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button onClick={handleStatusUpdate} disabled={isUpdating || status === report.status} className="w-full">
          {isUpdating ? "Updating..." : "Update Status"}
        </Button>
      </div>

      <Separator />

      {/* Add Notes */}
      <div className="space-y-3">
        <h4 className="font-medium flex items-center">
          <MessageSquare className="h-4 w-4 mr-2" />
          Add Note
        </h4>
        <Textarea
          placeholder="Add your analysis or notes about this report..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={3}
        />
        <Button
          onClick={addNote}
          disabled={!notes.trim() || isUpdating}
          variant="outline"
          className="w-full bg-transparent"
        >
          {isUpdating ? "Adding..." : "Add Note"}
        </Button>
      </div>
    </div>
  )
}
