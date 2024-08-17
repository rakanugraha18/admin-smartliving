import React from "react";
import FirebaseImageUpload from "../Firebase/FirebaseImageUpload";
import DashboardLayout from "../components/organism/DashboardLayout";

function DashboardPage() {
  return (
    <div>
      <FirebaseImageUpload />
    </div>
  );
}

export default DashboardPage;
