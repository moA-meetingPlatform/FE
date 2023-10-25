import React from "react";
import { Navbar, NavbarBrand, NavbarContent } from "@nextui-org/navbar";
import { Link } from "@nextui-org/link";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { grey } from '@mui/material/colors';

export default function MeetingCreateHeader() {
  return (
    <>
      <Navbar className="bg-white">
        <NavbarBrand>
          <Link href="/">
            <div className="mt-5 mb-5">
              <ArrowBackIcon fontSize="large" sx={{ color: grey[900] }} />
            </div>
          </Link>
        </NavbarBrand>
        <NavbarContent className="hidden sm:flex gap-4" justify="center">

        </NavbarContent>
      </Navbar>
    </>
  );
}
