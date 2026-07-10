import { Student } from "../models/index.js";
import { ok, fail } from "../utils/response.js";

const COURSES = [
  "Dars e Nizami",
  "Shoba e Hifz o Nazra",
  "Shoba e Banat",
  "Al Abbasi Islamic Education System",
  "Takhassus",
  "Taleem e deen course",
  "Dora e Tafseer",
  "Dora e Tadrebiyyah",
  "Dora Lugat e Arabi",
  "Dora e Sarf o Nahw",
  "English Language Course",
  "Dora e Tajweed",
  "Taleem o Tarbiyat",
  "Quiz Program",
  "Other",
];

const ADMISSION_STATUSES = [
  "pending",
  "approved",
  "active",
  "rejected",
  "inactive",
  "blocked",
];

const SEMESTER_STATUSES = [
  "pending",
  "active",
  "completed",
  "passed",
  "failed",
];

const toInteger = (value, fallback = null) => {
  if (value === undefined || value === null || value === "") {
    return fallback;
  }

  const number = Number(value);
  return Number.isInteger(number) ? number : fallback;
};

const cleanText = (value) => {
  if (value === undefined || value === null) return undefined;

  const text = value.toString().trim();
  return text === "" ? null : text;
};

const normalizeAdmissionPayload = (payload = {}) => {
  const normalized = { ...payload };

  // Support old and new frontend field names
  normalized.name = cleanText(
    payload.name ??
      payload.student_name ??
      payload.studentName ??
      payload.fullName
  );

  normalized.father_name = cleanText(
    payload.father_name ??
      payload.fatherName ??
      payload.guardian_name ??
      payload.guardianName
  );

  normalized.dob = cleanText(
    payload.dob ??
      payload.date_of_birth ??
      payload.dateOfBirth
  );

  normalized.student_cnic = cleanText(
    payload.student_cnic ??
      payload.student_b_form_or_cnic ??
      payload.studentBFormOrCnic ??
      payload.b_form ??
      payload.bForm ??
      payload.cnic
  );

  normalized.guardian_cnic = cleanText(
    payload.guardian_cnic ??
      payload.father_cnic ??
      payload.fatherCnic
  );

  normalized.phone = cleanText(
    payload.phone ??
      payload.mobile ??
      payload.mobileNumber
  );

  normalized.whatsapp = cleanText(
    payload.whatsapp ??
      payload.whatsapp_number ??
      payload.whatsappNumber
  );

  normalized.address = cleanText(payload.address);
  normalized.city = cleanText(payload.city);
  normalized.district = cleanText(payload.district);
  normalized.province = cleanText(payload.province);

  normalized.dini_education = cleanText(
    payload.dini_education ??
      payload.diniEducation
  );

  normalized.prev_dini_institute = cleanText(
    payload.prev_dini_institute ??
      payload.previous_dini_institute ??
      payload.previousDiniInstitute
  );

  normalized.prev_school = cleanText(
    payload.prev_school ??
      payload.previous_asri_institute ??
      payload.previousSchool
  );

  normalized.previous_class = cleanText(
    payload.previous_class ??
      payload.previous_class_or_degree ??
      payload.previousClass
  );

  normalized.activities = cleanText(
    payload.activities ??
      payload.other_activities ??
      payload.otherActivities
  );

  normalized.guardian_name = cleanText(
    payload.guardian_name ??
      payload.guardianName
  );

  normalized.guardian_profession = cleanText(
    payload.guardian_profession ??
      payload.guardianProfession
  );

  normalized.guardian_phone = cleanText(
    payload.guardian_phone ??
      payload.guardianPhone
  );

  normalized.relation = cleanText(
    payload.relation ??
      payload.guardian_relation ??
      payload.guardianRelation
  );

  normalized.guarantor_name = cleanText(
    payload.guarantor_name ??
      payload.guarantorName
  );

  normalized.guarantor_profession = cleanText(
    payload.guarantor_profession ??
      payload.guarantorProfession
  );

  normalized.guarantor_phone = cleanText(
    payload.guarantor_phone ??
      payload.guarantorPhone
  );

  normalized.course_applied_for = cleanText(
    payload.course_applied_for ??
      payload.courseAppliedFor ??
      payload.course
  );

  normalized.other_course = cleanText(
    payload.other_course ??
      payload.otherCourse
  );

  normalized.age = toInteger(payload.age);
  normalized.semester_no = toInteger(
    payload.semester_no ?? payload.semesterNo,
    1
  );

  normalized.current_semester = toInteger(
    payload.current_semester ?? payload.currentSemester,
    normalized.semester_no || 1
  );

  normalized.status = cleanText(
    payload.status ??
      payload.admission_status ??
      payload.admissionStatus
  )?.toLowerCase();

  normalized.semester_status = cleanText(
    payload.semester_status ??
      payload.semesterStatus
  )?.toLowerCase();

  normalized.remarks = cleanText(
    payload.remarks ??
      payload.admin_remarks ??
      payload.adminRemarks
  );

  normalized.profile_image_url = cleanText(
    payload.profile_image_url ??
      payload.profileImageUrl
  );

  normalized.student_document_url = cleanText(
    payload.student_document_url ??
      payload.studentDocumentUrl
  );

  normalized.father_cnic_document_url = cleanText(
    payload.father_cnic_document_url ??
      payload.fatherCnicDocumentUrl
  );

  normalized.educational_document_url = cleanText(
    payload.educational_document_url ??
      payload.educationalDocumentUrl
  );

  return normalized;
};

const getUploadedFilePath = (file) => {
  if (!file) return null;

  return `/uploads/students/${file.filename}`;
};

const applyUploadedFiles = (payload, req) => {
  const files = req.files || {};

  const profileImage =
    files.profileImage?.[0] ||
    files.profile_image?.[0];

  const studentDocument =
    files.studentDocument?.[0] ||
    files.student_document?.[0] ||
    files.studentCnic?.[0] ||
    files.student_cnic_document?.[0];

  const fatherCnic =
    files.fatherCnic?.[0] ||
    files.father_cnic?.[0] ||
    files.fatherCnicDocument?.[0];

  const educationalDocument =
    files.educationalDocument?.[0] ||
    files.educationalDocuments?.[0] ||
    files.educational_document?.[0];

  if (profileImage) {
    payload.profile_image_url = getUploadedFilePath(profileImage);
  }

  if (studentDocument) {
    payload.student_document_url = getUploadedFilePath(studentDocument);
  }

  if (fatherCnic) {
    payload.father_cnic_document_url = getUploadedFilePath(fatherCnic);
  }

  if (educationalDocument) {
    payload.educational_document_url =
      getUploadedFilePath(educationalDocument);
  }

  return payload;
};

// =========================
// ADMIN: LIST ALL STUDENTS
// =========================
export const listStudents = async (req, res) => {
  try {
    const data = await Student.findAll({
      order: [["createdAt", "DESC"]],
    });

    return ok(res, data);
  } catch (error) {
    console.error("listStudents error:", error);

    return fail(res, "Failed to load students");
  }
};

// =========================
// STUDENT: VIEW OWN RECORD
// =========================
export const getMyStudentRecord = async (req, res) => {
  try {
    const item = await Student.findOne({
      where: {
        userId: req.user.id,
      },
    });

    if (!item) {
      return fail(res, "Student record not found", 404);
    }

    return ok(res, item);
  } catch (error) {
    console.error("getMyStudentRecord error:", error);

    return fail(res, "Failed to load student record");
  }
};

// =========================
// ADMIN: VIEW ONE STUDENT
// =========================
export const getStudentById = async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return fail(res, "Invalid student ID", 400);
    }

    const item = await Student.findByPk(id);

    if (!item) {
      return fail(res, "Student not found", 404);
    }

    return ok(res, item);
  } catch (error) {
    console.error("getStudentById error:", error);

    return fail(res, "Failed to load student");
  }
};

// =========================
// STUDENT: SUBMIT ADMISSION
// =========================
export const createAdmission = async (req, res) => {
  try {
    let payload = normalizeAdmissionPayload(req.body || {});
    payload = applyUploadedFiles(payload, req);

    if (!payload.name) {
      return fail(res, "Student name is required", 400);
    }

    if (!payload.father_name) {
      return fail(
        res,
        "Father / guardian name is required",
        400
      );
    }

    if (!payload.phone && !payload.whatsapp) {
      return fail(
        res,
        "At least one contact number is required",
        400
      );
    }

    if (!payload.course_applied_for) {
      return fail(res, "Please select a course", 400);
    }

    if (!COURSES.includes(payload.course_applied_for)) {
      return fail(res, "Invalid course selected", 400);
    }

    if (
      payload.course_applied_for === "Other" &&
      !payload.other_course
    ) {
      return fail(
        res,
        "Please enter the other course name",
        400
      );
    }

    const userId =
      req.user.role === "student"
        ? req.user.id
        : toInteger(req.body.userId);

    if (!userId) {
      return fail(res, "Student user ID is required", 400);
    }

    const existing = await Student.findOne({
      where: { userId },
    });

    if (existing) {
      return fail(
        res,
        "Admission form has already been submitted",
        409
      );
    }

    const item = await Student.create({
      ...payload,

      status: "pending",
      semester_status: "pending",

      admission_date:
        payload.admission_date || new Date(),

      semester_no:
        payload.semester_no || 1,

      current_semester:
        payload.current_semester ||
        payload.semester_no ||
        1,

      userId,
      createdBy: req.user.id,
    });

    return ok(res, item);
  } catch (error) {
    console.error("createAdmission error:", error);
    console.error(
      "createAdmission SQL error:",
      error?.parent?.sqlMessage
    );

    return fail(
      res,
      error?.parent?.sqlMessage ||
        "Failed to submit admission form"
    );
  }
};

// =========================
// STUDENT: RENEWAL REQUEST
// =========================
export const createRenewal = async (req, res) => {
  try {
    const payload = normalizeAdmissionPayload(req.body || {});

    const existing = await Student.findOne({
      where: {
        userId: req.user.id,
      },
    });

    if (!existing) {
      return fail(res, "Student record not found", 404);
    }

    existing.renewal_date = new Date();

    if (payload.semester_no != null) {
      existing.semester_no = payload.semester_no;
      existing.current_semester = payload.semester_no;
    }

    if (payload.phone !== undefined) {
      existing.phone = payload.phone;
    }

    if (payload.whatsapp !== undefined) {
      existing.whatsapp = payload.whatsapp;
    }

    if (payload.address !== undefined) {
      existing.address = payload.address;
    }

    if (payload.city !== undefined) {
      existing.city = payload.city;
    }

    if (payload.remarks !== undefined) {
      existing.remarks = payload.remarks;
    }

    existing.status = "pending";
    existing.semester_status = "pending";

    await existing.save();

    return ok(res, existing);
  } catch (error) {
    console.error("createRenewal error:", error);

    return fail(res, "Failed to submit renewal request");
  }
};

// =========================
// STUDENT: PROFILE IMAGE
// =========================
export const uploadMyProfileImage = async (req, res) => {
  try {
    const file =
      req.file ||
      req.files?.profileImage?.[0] ||
      req.files?.profile_image?.[0];

    if (!file) {
      return fail(res, "Profile image is required", 400);
    }

    const item = await Student.findOne({
      where: {
        userId: req.user.id,
      },
    });

    if (!item) {
      return fail(
        res,
        "Submit admission form before uploading profile image",
        404
      );
    }

    item.profile_image_url = getUploadedFilePath(file);

    await item.save();

    return ok(res, {
      message: "Profile image updated successfully",
      profileImage: item.profile_image_url,
      student: item,
    });
  } catch (error) {
    console.error("uploadMyProfileImage error:", error);

    return fail(res, "Failed to upload profile image");
  }
};

// =========================
// STUDENT: UPLOAD DOCUMENTS
// =========================
export const uploadMyDocuments = async (req, res) => {
  try {
    const item = await Student.findOne({
      where: {
        userId: req.user.id,
      },
    });

    if (!item) {
      return fail(
        res,
        "Submit admission form before uploading documents",
        404
      );
    }

    const payload = applyUploadedFiles({}, req);

    const allowedFields = [
      "profile_image_url",
      "student_document_url",
      "father_cnic_document_url",
      "educational_document_url",
    ];

    let updated = false;

    for (const field of allowedFields) {
      if (payload[field]) {
        item[field] = payload[field];
        updated = true;
      }
    }

    if (!updated) {
      return fail(res, "No document was uploaded", 400);
    }

    await item.save();

    return ok(res, {
      message: "Student documents uploaded successfully",
      student: item,
    });
  } catch (error) {
    console.error("uploadMyDocuments error:", error);

    return fail(res, "Failed to upload student documents");
  }
};

// =========================
// ADMIN: UPDATE STUDENT
// =========================
export const updateStudent = async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return fail(res, "Invalid student ID", 400);
    }

    let payload = normalizeAdmissionPayload(req.body || {});
    payload = applyUploadedFiles(payload, req);

    const item = await Student.findByPk(id);

    if (!item) {
      return fail(res, "Student not found", 404);
    }

    if (
      payload.status !== undefined &&
      payload.status !== null &&
      !ADMISSION_STATUSES.includes(payload.status)
    ) {
      return fail(res, "Invalid admission status", 400);
    }

    if (
      payload.semester_status !== undefined &&
      payload.semester_status !== null &&
      !SEMESTER_STATUSES.includes(
        payload.semester_status
      )
    ) {
      return fail(res, "Invalid semester status", 400);
    }

    if (
      payload.course_applied_for !== undefined &&
      payload.course_applied_for !== null &&
      !COURSES.includes(payload.course_applied_for)
    ) {
      return fail(res, "Invalid course selected", 400);
    }

    const editableFields = [
      "name",
      "father_name",
      "dob",
      "age",
      "gender",
      "marital_status",

      "student_cnic",
      "guardian_cnic",

      "phone",
      "whatsapp",
      "address",
      "city",
      "district",
      "province",

      "dini_education",
      "prev_dini_institute",
      "prev_school",
      "previous_class",

      "course_applied_for",
      "other_course",
      "activities",

      "guardian_name",
      "guardian_profession",
      "guardian_phone",
      "relation",

      "guarantor_name",
      "guarantor_profession",
      "guarantor_phone",

      "profile_image_url",
      "student_document_url",
      "father_cnic_document_url",
      "educational_document_url",

      "admission_date",
      "renewal_date",
      "current_semester",
      "semester_no",
      "semester_status",
      "status",
      "remarks",
    ];

    for (const field of editableFields) {
      if (payload[field] !== undefined) {
        item[field] = payload[field];
      }
    }

    await item.save();

    return ok(res, item);
  } catch (error) {
    console.error("updateStudent error:", error);
    console.error(
      "updateStudent SQL error:",
      error?.parent?.sqlMessage
    );

    return fail(
      res,
      error?.parent?.sqlMessage ||
        "Failed to update student"
    );
  }
};

// =========================
// ADMIN: DELETE STUDENT
// =========================
export const deleteStudent = async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return fail(res, "Invalid student ID", 400);
    }

    const deleted = await Student.destroy({
      where: { id },
    });

    if (!deleted) {
      return fail(res, "Student not found", 404);
    }

    return ok(res, {
      message: "Student deleted successfully",
    });
  } catch (error) {
    console.error("deleteStudent error:", error);

    return fail(res, "Failed to delete student");
  }
};