"use client";
import * as React from "react";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Navbar from "./Navbar";

import { useToast } from "@/components/ui/use-toast";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface Track {
  customer_contact_no: string;
  customer_postal_code: string;
  track_id: string;
  order_id: string;
  customer_id: string;
  tracking_status: string;
}

export default function ShipmentTrackingPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [trackData, setTrackData] = useState<Track[]>([]);
  const [filteredData, setFilteredData] = useState([] as any[]);
  const [cookies] = useCookies(["token"]);

  const { toast } = useToast();

  const [editTrackId, setEditTrackId] = useState("");
  const [newStatus, setNewStatus] = useState("");

  const itemsPerPage = 5;

  useEffect(() => {
    const token = cookies.token;
    fetchTrackData(token);
  }, []);

  const fetchTrackData = async (token: string) => {
    try {
      const res = await fetch("http://localhost:8080/tracks/info", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setTrackData(data.tracks);
      setFilteredData(data.tracks);
    } catch (error) {
      console.error("Error fetching track data:", error);
    }
  };

  const handleSearch = () => {
    const filtered = trackData.filter(
      (track) =>
        track.customer_contact_no.includes(searchQuery) ||
        track.track_id.includes(searchQuery) ||
        track.order_id.includes(searchQuery) ||
        track.customer_id.includes(searchQuery) ||
        track.customer_postal_code.includes(searchQuery)
    );
    setFilteredData(filtered);
    setCurrentPage(1);
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleCancelEdit = () => {
    setEditTrackId("");
    setNewStatus("");
  };

  const handleSaveEdit = async () => {
    const token = cookies.token;
    try {
      const response = await fetch("http://localhost:8080/tracks/updatetrack", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          track_id: editTrackId,
          new_tracking_status: newStatus,
        }),
      });

      if (response.ok) {
        // Update the tracking status in the local state
        const updatedTracks = trackData.map((track) => {
          if (track.track_id === editTrackId) {
            return { ...track, tracking_status: newStatus };
          }
          return track;
        });
        setTrackData(updatedTracks);
        setFilteredData(updatedTracks);
        toast({
          title: "Tracking status updated!",
          variant: "success",
        });
        handleCancelEdit();
      } else {
        toast({
          title: "Failed to update tracking status",
          description: "Please try again",
          variant: "destructive",
        });
        console.error("Failed to update tracking status:", response.statusText);
      }
    } catch (error) {
      toast({
        title: "Error updating tracking status",
        description: "Please try again later",
        variant: "destructive",
      });
      console.error("Error updating tracking status:", error);
    }
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredData
    ? filteredData.slice(startIndex, endIndex)
    : [];

  const totalCount = filteredData ? filteredData.length : 0;

  return (
    <div>
      <Navbar />
      <div className="flex px-5 pb-20 flex-col min-h-[100dvh] items-center">
        <h1 className="mt-32 w-full max-w-6xl mb-10 text-2xl font-semibold">
          Track your Shipments
        </h1>
        <div className="flex w-full max-w-6xl  items-center pb-10">
          <Input
            placeholder="Enter Tracking Number, Product Name, or Location"
            className="max-w-lg"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
          />
          <Button className="ml-4" onClick={handleSearch}>
            Search
          </Button>
        </div>

        <div className="rounded-md border max-w-6xl w-full">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tracking ID</TableHead>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer ID</TableHead>
                <TableHead>Customer Contact</TableHead>
                <TableHead>Delivery Address</TableHead>
                <TableHead>Delivery Pin</TableHead>
                <TableHead>Tracking Status</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentItems.map((track, index) => (
                <TableRow key={index}>
                  <TableCell>{track.track_id}</TableCell>
                  <TableCell>{track.order_id}</TableCell>
                  <TableCell>{track.customer_id}</TableCell>
                  <TableCell>{track.customer_contact_no}</TableCell>
                  <TableCell>
                    {`${track.customer_city}, ${track.customer_region}, ${track.customer_country}`}
                  </TableCell>
                  <TableCell>{track.customer_postal_code}</TableCell>
                  <TableCell>{track.tracking_status}</TableCell>
                  <TableCell>
                    <AlertDialog>
                      <AlertDialogTrigger>
                        <Button onClick={() => setEditTrackId(track.track_id)}>
                          Edit
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Edit Tracking Status
                          </AlertDialogTitle>
                        </AlertDialogHeader>
                        <AlertDialogDescription>
                          <Input
                            value={newStatus}
                            onChange={(e) => setNewStatus(e.target.value)}
                          />
                        </AlertDialogDescription>
                        <AlertDialogFooter>
                          <AlertDialogCancel>
                            <button
                              className="w-full"
                              onClick={handleCancelEdit}
                            >
                              Cancel
                            </button>
                          </AlertDialogCancel>
                          <AlertDialogAction>
                            <button className="w-full" onClick={handleSaveEdit}>
                              Save
                            </button>
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="flex items-center justify-between w-full max-w-6xl space-x-2 py-4">
          <div className="flex-1 text-sm text-muted-foreground">
            Showing {startIndex + 1} - {Math.min(endIndex, totalCount)} of{" "}
            {totalCount} tracks
          </div>
          <div className="space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handlePrevPage}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleNextPage}
              disabled={endIndex >= totalCount}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
