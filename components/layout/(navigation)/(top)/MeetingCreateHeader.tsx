import React from "react";
import { Navbar, NavbarBrand, NavbarContent } from "@nextui-org/navbar";
import { Link } from "@nextui-org/link";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { grey } from '@mui/material/colors';
export default function MeetingCreateHeader() {
  return (
    <Navbar >
      <NavbarBrand>
        <Link href="/">
          <ArrowBackIcon sx={{ color: grey[900] }} />
        </Link>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">

      </NavbarContent>
    </Navbar>
  );
}
