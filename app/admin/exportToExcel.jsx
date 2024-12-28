import * as XLSX from "xlsx";

const exportToExcel = (registrations) => {
  if (registrations.length === 0) {
    alert("No registrations to export.");
    return;
  }

  const worksheetData = registrations.map((reg) => ({
    "Ticket Number": reg.ticketNumber,
    "Team Name": reg.teamName,
    "Idea Title": reg.teamIdeaTitle,
    "College Name": reg.teamLeader.clg,
    "Team Leader": `${reg.teamLeader.fname} ${reg.teamLeader.lname}`,
    "Team Members": reg.teamMembers
      ? reg.teamMembers.map((m) => `${m.fname} ${m.lname}`).join(", ")
      : "No members",
    "Phone Number": reg.teamLeader.phone,
    "Status": reg.status,
    "Abstract Link": reg.abstractPdfUrl,
  }));

  const worksheet = XLSX.utils.json_to_sheet(worksheetData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Registrations");

  // Export to Excel
  XLSX.writeFile(workbook, "registrations.xlsx");
};


export default exportToExcel;