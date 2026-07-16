import ExcelJS from "exceljs";
import { Student } from "../models/index.js";

// ======================================================
// Helpers
// ======================================================

const safeValue = (value) => {
  if (value === undefined || value === null) {
    return "";
  }

  return value;
};

const formatDateForFileName = () => {
  const now = new Date();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const hour = String(now.getHours()).padStart(2, "0");
  const minute = String(now.getMinutes()).padStart(2, "0");
  const second = String(now.getSeconds()).padStart(2, "0");

  return `${year}-${month}-${day}_${hour}-${minute}-${second}`;
};

const applyBorder = (cell) => {
  cell.border = {
    top: {
      style: "thin",
      color: {
        argb: "FFD7E2E8",
      },
    },
    left: {
      style: "thin",
      color: {
        argb: "FFD7E2E8",
      },
    },
    bottom: {
      style: "thin",
      color: {
        argb: "FFD7E2E8",
      },
    },
    right: {
      style: "thin",
      color: {
        argb: "FFD7E2E8",
      },
    },
  };
};

const applyHeaderStyle = (row) => {
  row.height = 30;

  row.eachCell(
    {
      includeEmpty: true,
    },
    (cell) => {
      cell.font = {
        bold: true,
        color: {
          argb: "FFFFFFFF",
        },
        size: 11,
      };

      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: {
          argb: "FF0D8B6F",
        },
      };

      cell.alignment = {
        vertical: "middle",
        horizontal: "center",
        wrapText: true,
      };

      applyBorder(cell);
    }
  );
};

const applyBodyStyle = (worksheet) => {
  worksheet.eachRow(
    {
      includeEmpty: false,
    },
    (row, rowNumber) => {
      if (rowNumber === 1) {
        return;
      }

      row.height = 24;

      row.eachCell(
        {
          includeEmpty: true,
        },
        (cell) => {
          cell.alignment = {
            vertical: "middle",
            horizontal: "left",
            wrapText: true,
          };

          applyBorder(cell);

          if (rowNumber % 2 === 0) {
            cell.fill = {
              type: "pattern",
              pattern: "solid",
              fgColor: {
                argb: "FFF4F8F7",
              },
            };
          }
        }
      );
    }
  );
};

const setColumnWidths = (worksheet) => {
  worksheet.columns.forEach((column) => {
    let maximumLength = 12;

    column.eachCell(
      {
        includeEmpty: true,
      },
      (cell) => {
        let value = cell.value;

        if (
          value !== null &&
          typeof value === "object" &&
          !(value instanceof Date)
        ) {
          if (value.text) {
            value = value.text;
          } else {
            try {
              value = JSON.stringify(value);
            } catch {
              value = String(value);
            }
          }
        }

        const length =
          value instanceof Date
            ? 20
            : String(value ?? "").length;

        maximumLength = Math.max(
          maximumLength,
          Math.min(length + 3, 45)
        );
      }
    );

    column.width = maximumLength;
  });
};

const makeAbsoluteUrl = (req, value) => {
  const path = safeValue(value).toString().trim();

  if (!path) {
    return "";
  }

  if (
    path.startsWith("http://") ||
    path.startsWith("https://")
  ) {
    return path;
  }

  const baseUrl = `${req.protocol}://${req.get("host")}`;

  return path.startsWith("/")
    ? `${baseUrl}${path}`
    : `${baseUrl}/${path}`;
};

const countByStatus = (students, status) => {
  return students.filter((student) => {
    return (
      String(student.status || "")
        .trim()
        .toLowerCase() === status
    );
  }).length;
};

// ======================================================
// Export Students Excel
// ======================================================

export const exportStudentsExcel = async (req, res) => {
  try {
    const students = await Student.findAll({
      order: [["createdAt", "DESC"]],
    });

    const workbook = new ExcelJS.Workbook();

    workbook.creator = "Islamic Academy";
    workbook.lastModifiedBy = "Islamic Academy Admin";
    workbook.created = new Date();
    workbook.modified = new Date();

    workbook.properties = {
      title: "Islamic Academy Student Records",
      subject: "Students Data Export",
      company: "Islamic Academy",
    };

    // ==================================================
    // Students Worksheet
    // ==================================================

    const worksheet = workbook.addWorksheet(
      "Students Records",
      {
        views: [
          {
            state: "frozen",
            ySplit: 1,
          },
        ],
        properties: {
          defaultRowHeight: 24,
        },
        pageSetup: {
          orientation: "landscape",
          fitToPage: true,
          fitToWidth: 1,
          fitToHeight: 0,
          paperSize: 9,
          margins: {
            left: 0.25,
            right: 0.25,
            top: 0.5,
            bottom: 0.5,
            header: 0.2,
            footer: 0.2,
          },
        },
      }
    );

    worksheet.columns = [
      {
        header: "ID",
        key: "id",
      },
      {
        header: "Student Name",
        key: "name",
      },
      {
        header: "Father Name",
        key: "father_name",
      },
      {
        header: "Date of Birth",
        key: "dob",
      },
      {
        header: "Age",
        key: "age",
      },
      {
        header: "Gender",
        key: "gender",
      },
      {
        header: "Marital Status",
        key: "marital_status",
      },
      {
        header: "Student CNIC / B-Form",
        key: "student_cnic",
      },
      {
        header: "CNIC",
        key: "cnic",
      },
      {
        header: "Guardian CNIC",
        key: "guardian_cnic",
      },
      {
        header: "Phone",
        key: "phone",
      },
      {
        header: "WhatsApp",
        key: "whatsapp",
      },
      {
        header: "Emergency Contact Name",
        key: "emergency_contact_name",
      },
      {
        header: "Emergency Contact Phone",
        key: "emergency_contact_phone",
      },
      {
        header: "Address",
        key: "address",
      },
      {
        header: "City",
        key: "city",
      },
      {
        header: "District",
        key: "district",
      },
      {
        header: "Province",
        key: "province",
      },
      {
        header: "Religious Education",
        key: "dini_education",
      },
      {
        header: "General Education",
        key: "asri_education",
      },
      {
        header: "Previous Religious Institute",
        key: "prev_dini_institute",
      },
      {
        header: "Previous School / Institute",
        key: "prev_school",
      },
      {
        header: "Previous Class / Degree",
        key: "previous_class",
      },
      {
        header: "Course Applied For",
        key: "course_applied_for",
      },
      {
        header: "Other Course",
        key: "other_course",
      },
      {
        header: "Other Activities",
        key: "activities",
      },
      {
        header: "Medical Condition",
        key: "medical_condition",
      },
      {
        header: "Guardian Name",
        key: "guardian_name",
      },
      {
        header: "Guardian Profession",
        key: "guardian_profession",
      },
      {
        header: "Guardian Phone",
        key: "guardian_phone",
      },
      {
        header: "Guardian Relation",
        key: "relation",
      },
      {
        header: "Guarantor Name",
        key: "guarantor_name",
      },
      {
        header: "Guarantor Profession",
        key: "guarantor_profession",
      },
      {
        header: "Guarantor Phone",
        key: "guarantor_phone",
      },
      {
        header: "Profile Image",
        key: "profile_image_url",
      },
      {
        header: "Student Document",
        key: "student_document_url",
      },
      {
        header: "Father CNIC Document",
        key: "father_cnic_document_url",
      },
      {
        header: "Educational Document",
        key: "educational_document_url",
      },
      {
        header: "Document Notes",
        key: "document_notes",
      },
      {
        header: "Admission Date",
        key: "admission_date",
      },
      {
        header: "Semester Number",
        key: "semester_no",
      },
      {
        header: "Semester Status",
        key: "semester_status",
      },
      {
        header: "Semester Result",
        key: "semester_result",
      },
      {
        header: "Semester Result PDF",
        key: "semester_result_pdf",
      },
      {
        header: "Renewal Date",
        key: "renewal_date",
      },
      {
        header: "Admission Status",
        key: "status",
      },
      {
        header: "Remarks",
        key: "remarks",
      },
      {
        header: "User ID",
        key: "userId",
      },
      {
        header: "Created By",
        key: "createdBy",
      },
      {
        header: "Created At",
        key: "createdAt",
      },
      {
        header: "Updated At",
        key: "updatedAt",
      },
    ];

    for (const student of students) {
      const data = student.toJSON();

      worksheet.addRow({
        id: safeValue(data.id),

        name: safeValue(data.name),

        father_name: safeValue(
          data.father_name
        ),

        dob: safeValue(
          data.dob ??
            data.date_of_birth
        ),

        age: safeValue(data.age),

        gender: safeValue(data.gender),

        marital_status: safeValue(
          data.marital_status
        ),

        student_cnic: safeValue(
          data.student_cnic ??
            data.student_b_form_or_cnic
        ),

        cnic: safeValue(data.cnic),

        guardian_cnic: safeValue(
          data.guardian_cnic
        ),

        phone: safeValue(data.phone),

        whatsapp: safeValue(
          data.whatsapp ??
            data.whatsapp_number
        ),

        emergency_contact_name: safeValue(
          data.emergency_contact_name
        ),

        emergency_contact_phone: safeValue(
          data.emergency_contact_phone
        ),

        address: safeValue(data.address),

        city: safeValue(data.city),

        district: safeValue(data.district),

        province: safeValue(data.province),

        dini_education: safeValue(
          data.dini_education
        ),

        asri_education: safeValue(
          data.asri_education
        ),

        prev_dini_institute: safeValue(
          data.prev_dini_institute ??
            data.previous_dini_institute
        ),

        prev_school: safeValue(
          data.prev_school ??
            data.previous_asri_institute
        ),

        previous_class: safeValue(
          data.previous_class ??
            data.previous_class_or_degree
        ),

        course_applied_for: safeValue(
          data.course_applied_for
        ),

        other_course: safeValue(
          data.other_course
        ),

        activities: safeValue(
          data.activities ??
            data.other_activities
        ),

        medical_condition: safeValue(
          data.medical_condition
        ),

        guardian_name: safeValue(
          data.guardian_name
        ),

        guardian_profession: safeValue(
          data.guardian_profession
        ),

        guardian_phone: safeValue(
          data.guardian_phone
        ),

        relation: safeValue(
          data.relation ??
            data.guardian_relation
        ),

        guarantor_name: safeValue(
          data.guarantor_name
        ),

        guarantor_profession: safeValue(
          data.guarantor_profession
        ),

        guarantor_phone: safeValue(
          data.guarantor_phone
        ),

        profile_image_url: makeAbsoluteUrl(
          req,
          data.profile_image_url ??
            data.profile_image
        ),

        student_document_url: makeAbsoluteUrl(
          req,
          data.student_document_url ??
            data.student_document
        ),

        father_cnic_document_url: makeAbsoluteUrl(
          req,
          data.father_cnic_document_url ??
            data.father_cnic_document
        ),

        educational_document_url: makeAbsoluteUrl(
          req,
          data.educational_document_url ??
            data.educational_document
        ),

        document_notes: safeValue(
          data.document_notes
        ),

        admission_date: safeValue(
          data.admission_date
        ),

        semester_no: safeValue(
          data.semester_no
        ),

        semester_status: safeValue(
          data.semester_status
        ),

        semester_result: safeValue(
          data.semester_result
        ),

        semester_result_pdf: makeAbsoluteUrl(
          req,
          data.semester_result_pdf
        ),

        renewal_date: safeValue(
          data.renewal_date
        ),

        status: safeValue(data.status),

        remarks: safeValue(data.remarks),

        userId: safeValue(data.userId),

        createdBy: safeValue(data.createdBy),

        createdAt: safeValue(
          data.createdAt
        ),

        updatedAt: safeValue(
          data.updatedAt
        ),
      });
    }

    // ==================================================
    // Safe styling and auto filter
    // ==================================================

    applyHeaderStyle(
      worksheet.getRow(1)
    );

    applyBodyStyle(worksheet);

    setColumnWidths(worksheet);

    const lastColumnNumber =
      worksheet.columnCount;

    if (lastColumnNumber > 0) {
      const lastColumn =
        worksheet.getColumn(
          lastColumnNumber
        );

      const lastColumnLetter =
        lastColumn?.letter;

      if (lastColumnLetter) {
        worksheet.autoFilter = {
          from: "A1",
          to: `${lastColumnLetter}1`,
        };
      }
    }

    // ==================================================
    // Date formatting
    // ==================================================

    const dateColumnKeys = [
      "dob",
      "admission_date",
      "renewal_date",
      "createdAt",
      "updatedAt",
    ];

    for (const key of dateColumnKeys) {
      const column =
        worksheet.getColumn(key);

      if (column) {
        column.numFmt =
          "yyyy-mm-dd hh:mm";
      }
    }

    // Date of birth does not need time.
    worksheet.getColumn("dob").numFmt =
      "yyyy-mm-dd";

    // ==================================================
    // Hyperlinks
    // ==================================================

    const hyperlinkKeys = [
      "profile_image_url",
      "student_document_url",
      "father_cnic_document_url",
      "educational_document_url",
      "semester_result_pdf",
    ];

    for (const key of hyperlinkKeys) {
      const column =
        worksheet.getColumn(key);

      column.eachCell(
        {
          includeEmpty: false,
        },
        (cell, rowNumber) => {
          if (rowNumber === 1) {
            return;
          }

          const url =
            cell.value?.toString().trim() ??
            "";

          if (
            url.startsWith("http://") ||
            url.startsWith("https://")
          ) {
            cell.value = {
              text: "Open File",
              hyperlink: url,
              tooltip: url,
            };

            cell.font = {
              color: {
                argb: "FF0563C1",
              },
              underline: true,
            };
          }
        }
      );
    }

    // ==================================================
    // Summary Worksheet
    // ==================================================

    const summarySheet =
      workbook.addWorksheet("Summary");

    summarySheet.columns = [
      {
        header: "Summary",
        key: "label",
        width: 30,
      },
      {
        header: "Value",
        key: "value",
        width: 22,
      },
    ];

    summarySheet.addRows([
      {
        label: "Total Students",
        value: students.length,
      },
      {
        label: "Active Students",
        value: countByStatus(
          students,
          "active"
        ),
      },
      {
        label: "Pending Students",
        value: countByStatus(
          students,
          "pending"
        ),
      },
      {
        label: "Rejected Students",
        value: countByStatus(
          students,
          "rejected"
        ),
      },
      {
        label: "Blocked Students",
        value: countByStatus(
          students,
          "blocked"
        ),
      },
      {
        label: "Graduated Students",
        value: countByStatus(
          students,
          "graduated"
        ),
      },
      {
        label: "Generated At",
        value: new Date(),
      },
    ]);

    applyHeaderStyle(
      summarySheet.getRow(1)
    );

    applyBodyStyle(summarySheet);

    // Generated At is on row 8:
    // row 1 = header, rows 2–8 = summary values.
    summarySheet.getCell("B8").numFmt =
      "yyyy-mm-dd hh:mm";

    // ==================================================
    // Download Response
    // ==================================================

    const fileName =
      `students_${formatDateForFileName()}.xlsx`;

    res.status(200);

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );

    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${fileName}"`
    );

    res.setHeader(
      "Access-Control-Expose-Headers",
      "Content-Disposition"
    );

    res.setHeader(
      "Cache-Control",
      "no-store, no-cache, must-revalidate"
    );

    await workbook.xlsx.write(res);

    return res.end();
  } catch (error) {
    console.error(
      "exportStudentsExcel error:",
      error
    );

    console.error(
      "exportStudentsExcel stack:",
      error?.stack
    );

    if (!res.headersSent) {
      return res.status(500).json({
        success: false,
        msg:
          error?.parent?.sqlMessage ||
          error?.message ||
          "Failed to export student records",
      });
    }

    return res.end();
  }
};