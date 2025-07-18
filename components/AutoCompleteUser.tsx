"use client";

import React, { useState, useEffect, useRef } from "react";
import { CloseButton, Input, Spinner } from "reactstrap";
import { searchUserWithAuth } from "../utils/axiosUtils";

// Mock API: Replace with real API call
const findUser = async (query: string) => {
  if (!query) return [];
  const response = await searchUserWithAuth('user/search-user',  { query } ); // Simulated delay

  return response?.data || [];
};

type props = {
    setUser:(user:any) => void
}

const AutoCompleteUser = ({setUser}:props) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (!query) {
      setResults([]);
      setDropdownOpen(false);
      return;
    }

    setLoading(true);
    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);

    debounceTimeout.current = setTimeout(async () => {
      const users = await findUser(query);
      setResults(users);
      setDropdownOpen(users.length > 0);
      setLoading(false);
    }, 300);
  }, [query]);

  const handleSelect = (user: any) => {
    setSelectedUser(user);
    // setQuery(user.name);
    setDropdownOpen(false);
    setUser(user)

  };

  return (
    <div className="position-relative pb-2" ref={wrapperRef} style={{ width: "80%" }}>
      <div style={{ position: "relative" }}>
        <Input
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setSelectedUser(null);
          }}
          placeholder="Search and select user..."
          style={{ width: "100%" }}
        />
        {loading && (
          <div
            style={{
              position: "absolute",
              right: "10px",
              top: "50%",
              transform: "translateY(-50%)",
              pointerEvents: "none",
            }}
          >
            <Spinner size="sm" />
          </div>
        )}
        {(!loading && selectedUser?._id) && (
          <div
          onClick={()=>{handleSelect(null),setQuery("")}}
            style={{
              position: "absolute",
              right: "10px",
              top: "50%",
              transform: "translateY(-50%)",
             

            }}
          >
            <CloseButton />
          </div>
        )}
      </div>

      {dropdownOpen && results.length > 0 && (
        <div
          className="border position-absolute bg-white shadow-sm rounded"
          style={{ top: "100%", left: 0, marginTop: "2px", zIndex: 1000, width: "100%" }}
        >
          {results.map((user) => (
            <div
              key={user?._id}
              className="px-3 py-2 hover-bg"
              style={{ cursor: "pointer" }}
              onClick={() => handleSelect(user)}
            >
              {user?.firstName + " " + user?.lastName}
            </div>
          ))}
        </div>
      )}

      {selectedUser && (
        <div className="mt-2 text-success">✅ Selected:{selectedUser?.firstName + " " + selectedUser?.lastName}</div>
      )}
    </div>
  );
};

export default AutoCompleteUser;
