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

// Must match students.status ENUM in MySQL.
const ADMISSION_STATUSES = [
  "pending",
  "approved",
  "active",
  "suspended",
  "inactive",
  "blocked",
  "rejected",
  "graduated",
];

const SEMESTER_STATUSES = [
  "pending",
  "active",
  "completed",
  "passed",
  "failed",
  "on_hold",
  "cancelled",
];

const EDITABLE_FIELDS = [
  "name",
  "father_name",
  "dob",
  "age",
  "gender",
  "marital_status",

  "student_cnic",
  "cnic",
  "guardian_cnic",

  "phone",
  "whatsapp",
  "emergency_contact_name",
  "emergency_contact_phone",
  "address",
  "city",
  "district",
  "province",

  "dini_education",
  "asri_education",
  "prev_dini_institute",
  "prev_school",
  "previous_class",

  "course_applied_for",
  "other_course",
  "activities",
  "medical_condition",

  "guardian_name",
  "guardian_profession",
  "guardian_phone",
  "relation",


  "passport_photo_url",
  "profile_image_url",
  "student_document_url",
  "father_cnic_document_url",
  "educational_document_url",
  "document_notes",

  "admission_date",
  "renewal_date",
  "semester_no",
  "semester_status",
  "semester_result",
  "semester_result_pdf",
  "status",
  "remarks",
];

const getAuthenticatedUserId = (req) => {
  const value = req.user?.id ?? req.user?.userId;
  const id = Number(value);

  return Number.isInteger(id) && id > 0 ? id : null;
};

const toInteger = (value, fallback = null) => {
  if (
    value === undefined ||
    value === null ||
    value === ""
  ) {
    return fallback;
  }

  const number = Number(value);

  return Number.isInteger(number)
    ? number
    : fallback;
};

const cleanText = (value) => {
  if (value === undefined || value === null) {
    return undefined;
  }

  const text = value.toString().trim();

  return text === "" ? null : text;
};

const normalizeGender = (value) => {
  const gender = cleanText(value)?.toLowerCase();

  if (!gender) return undefined;

  if (
    ["male", "female", "other"].includes(gender)
  ) {
    return gender;
  }

  return undefined;
};

const normalizeMaritalStatus = (value) => {
  const status = cleanText(value)?.toLowerCase();

  if (!status) return undefined;

  if (["single", "married"].includes(status)) {
    return status;
  }

  return undefined;
};

const normalizeAdmissionPayload = (
  payload = {}
) => {
  const normalized = {};

  normalized.name = cleanText(
    payload.name ??
      payload.student_name ??
      payload.studentName ??
      payload.fullName
  );

  normalized.father_name = cleanText(
    payload.father_name ??
      payload.fatherName
  );

  normalized.dob = cleanText(
    payload.dob ??
      payload.date_of_birth ??
      payload.dateOfBirth
  );

  normalized.age = toInteger(payload.age);

  normalized.gender = normalizeGender(
    payload.gender
  );

  normalized.marital_status =
    normalizeMaritalStatus(
      payload.marital_status ??
        payload.maritalStatus
    );

  normalized.student_cnic = cleanText(
    payload.student_cnic ??
      payload.student_b_form_or_cnic ??
      payload.studentBFormOrCnic ??
      payload.b_form ??
      payload.bForm
  );

  normalized.cnic = cleanText(payload.cnic);

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

  normalized.emergency_contact_name =
    cleanText(
      payload.emergency_contact_name ??
        payload.emergencyContactName
    );

  normalized.emergency_contact_phone =
    cleanText(
      payload.emergency_contact_phone ??
        payload.emergencyContactPhone
    );

  normalized.address = cleanText(
    payload.address
  );

  normalized.city = cleanText(payload.city);

  normalized.district = cleanText(
    payload.district
  );

  normalized.province = cleanText(
    payload.province
  );

  normalized.dini_education = cleanText(
    payload.dini_education ??
      payload.diniEducation
  );

  normalized.asri_education = cleanText(
    payload.asri_education ??
      payload.asriEducation
  );

  normalized.prev_dini_institute =
    cleanText(
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

  normalized.course_applied_for =
    cleanText(
      payload.course_applied_for ??
        payload.courseAppliedFor ??
        payload.course
    );

  normalized.other_course = cleanText(
    payload.other_course ??
      payload.otherCourse
  );

  normalized.activities = cleanText(
    payload.activities ??
      payload.other_activities ??
      payload.otherActivities
  );

  normalized.medical_condition = cleanText(
    payload.medical_condition ??
      payload.medicalCondition
  );

  normalized.guardian_name = cleanText(
    payload.guardian_name ??
      payload.guardianName
  );

  normalized.guardian_profession =
    cleanText(
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

  normalized.guarantor_profession =
    cleanText(
      payload.guarantor_profession ??
        payload.guarantorProfession
    );

  normalized.guarantor_phone = cleanText(
    payload.guarantor_phone ??
      payload.guarantorPhone
  );

  normalized.passport_photo_url =
    cleanText(
      payload.passport_photo_url ??
        payload.passportPhotoUrl
    );

  normalized.profile_image_url =
    cleanText(
      payload.profile_image_url ??
        payload.profileImageUrl ??
        payload.profile_image
    );

  normalized.student_document_url =
    cleanText(
      payload.student_document_url ??
        payload.studentDocumentUrl ??
        payload.student_document
    );

  normalized.father_cnic_document_url =
    cleanText(
      payload.father_cnic_document_url ??
        payload.fatherCnicDocumentUrl ??
        payload.father_cnic_document
    );

  normalized.educational_document_url =
    cleanText(
      payload.educational_document_url ??
        payload.educationalDocumentUrl ??
        payload.educational_document
    );

  normalized.document_notes = cleanText(
    payload.document_notes ??
      payload.documentNotes
  );

  normalized.admission_date = cleanText(
    payload.admission_date ??
      payload.admissionDate
  );

  normalized.renewal_date = cleanText(
    payload.renewal_date ??
      payload.renewalDate
  );

  normalized.semester_no = toInteger(
    payload.semester_no ??
      payload.semesterNo,
    1
  );

  normalized.semester_status = cleanText(
    payload.semester_status ??
      payload.semesterStatus
  )?.toLowerCase();

  normalized.semester_result = cleanText(
    payload.semester_result ??
      payload.semesterResult
  );

  normalized.semester_result_pdf =
    cleanText(
      payload.semester_result_pdf ??
        payload.semesterResultPdf
    );

  normalized.status = cleanText(
    payload.status ??
      payload.admission_status ??
      payload.admissionStatus
  )?.toLowerCase();

  normalized.remarks = cleanText(
    payload.remarks ??
      payload.admin_remarks ??
      payload.adminRemarks
  );

  return Object.fromEntries(
    Object.entries(normalized).filter(
      ([, value]) => value !== undefined
    )
  );
};

const pickAllowedFields = (
  payload,
  allowedFields = EDITABLE_FIELDS
) => {
  const data = {};

  for (const field of allowedFields) {
    if (payload[field] !== undefined) {
      data[field] = payload[field];
    }
  }

  return data;
};

const getUploadedFilePath = (file) => {
  if (!file) return null;

  return `/uploads/students/${file.filename}`;
};

const applyUploadedFiles = (
  payload,
  req
) => {
  const files = req.files || {};

  const profileImage =
    req.file ||
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
    payload.profile_image_url =
      getUploadedFilePath(profileImage);
  }

  if (studentDocument) {
    payload.student_document_url =
      getUploadedFilePath(studentDocument);
  }

  if (fatherCnic) {
    payload.father_cnic_document_url =
      getUploadedFilePath(fatherCnic);
  }

  if (educationalDocument) {
    payload.educational_document_url =
      getUploadedFilePath(
        educationalDocument
      );
  }

  return payload;
};

const validateCourse = (
  payload,
  res
) => {
  if (!payload.course_applied_for) {
    return fail(
      res,
      "Please select a course",
      400
    );
  }

  if (
    !COURSES.includes(
      payload.course_applied_for
    )
  ) {
    return fail(
      res,
      "Invalid course selected",
      400
    );
  }

  if (
    payload.course_applied_for ===
      "Other" &&
    !payload.other_course
  ) {
    return fail(
      res,
      "Please enter the other course name",
      400
    );
  }

  return null;
};

// ======================================================
// ADMIN: LIST ALL STUDENTS
// ======================================================

export const listStudents = async (
  req,
  res
) => {
  try {
    const data = await Student.findAll({
      order: [["createdAt", "DESC"]],
    });

    return ok(res, data);
  } catch (error) {
    console.error(
      "listStudents error:",
      error
    );

    return fail(
      res,
      error?.parent?.sqlMessage ||
        "Failed to load students",
      500
    );
  }
};

// ======================================================
// STUDENT/ADMIN: VIEW OWN RECORD
// ======================================================

export const getMyStudentRecord = async (
  req,
  res
) => {
  try {
    const userId =
      getAuthenticatedUserId(req);

    if (!userId) {
      return fail(
        res,
        "User ID missing from authentication token",
        401
      );
    }

    const item = await Student.findOne({
      where: {
        userId,
      },
    });

    if (!item) {
      return fail(
        res,
        "Student record not found",
        404
      );
    }

    return ok(res, item);
  } catch (error) {
    console.error(
      "getMyStudentRecord error:",
      error
    );

    return fail(
      res,
      error?.parent?.sqlMessage ||
        "Failed to load student record",
      500
    );
  }
};

// ======================================================
// ADMIN: VIEW ONE STUDENT
// ======================================================

export const getStudentById = async (
  req,
  res
) => {
  try {
    const id = Number(req.params.id);

    if (
      !Number.isInteger(id) ||
      id <= 0
    ) {
      return fail(
        res,
        "Invalid student ID",
        400
      );
    }

    const item =
      await Student.findByPk(id);

    if (!item) {
      return fail(
        res,
        "Student not found",
        404
      );
    }

    return ok(res, item);
  } catch (error) {
    console.error(
      "getStudentById error:",
      error
    );

    return fail(
      res,
      error?.parent?.sqlMessage ||
        "Failed to load student",
      500
    );
  }
};

// ======================================================
// STUDENT/ADMIN: CREATE ADMISSION
// ======================================================

export const createAdmission = async (
  req,
  res
) => {
  try {
    const authenticatedUserId =
      getAuthenticatedUserId(req);

    if (!authenticatedUserId) {
      return fail(
        res,
        "User ID missing from authentication token",
        401
      );
    }

    let payload =
      normalizeAdmissionPayload(
        req.body || {}
      );

    payload = applyUploadedFiles(
      payload,
      req
    );

    if (!payload.name) {
      return fail(
        res,
        "Student name is required",
        400
      );
    }

    if (!payload.father_name) {
      return fail(
        res,
        "Father / guardian name is required",
        400
      );
    }

    if (
      !payload.phone &&
      !payload.whatsapp
    ) {
      return fail(
        res,
        "At least one contact number is required",
        400
      );
    }

    const courseError =
      validateCourse(payload, res);

    if (courseError) {
      return courseError;
    }

    const role = String(
      req.user?.role || ""
    )
      .trim()
      .toLowerCase();

    const userId =
      role === "student"
        ? authenticatedUserId
        : toInteger(req.body.userId);

    if (!userId) {
      return fail(
        res,
        "Student user ID is required",
        400
      );
    }

    const existing =
      await Student.findOne({
        where: {
          userId,
        },
      });

    if (existing) {
      return fail(
        res,
        "Admission form has already been submitted",
        409
      );
    }

    // Only valid Student model attributes
    // are passed to Sequelize.
    const createData =
      pickAllowedFields(payload);

    createData.status = "pending";
    createData.semester_status =
      "pending";

    createData.admission_date =
      payload.admission_date ||
      new Date();

    createData.semester_no =
      payload.semester_no || 1;

    createData.userId = userId;

    createData.createdBy =
      authenticatedUserId;

    const item =
      await Student.create(
        createData
      );

    return ok(res, item);
  } catch (error) {
    console.error(
      "createAdmission error:",
      error
    );

    console.error(
      "createAdmission SQL error:",
      error?.parent?.sqlMessage
    );

    return fail(
      res,
      error?.parent?.sqlMessage ||
        "Failed to submit admission form",
      500
    );
  }
};

// ======================================================
// STUDENT/ADMIN: RENEWAL REQUEST
// ======================================================

export const createRenewal = async (
  req,
  res
) => {
  try {
    const userId =
      getAuthenticatedUserId(req);

    if (!userId) {
      return fail(
        res,
        "User ID missing from authentication token",
        401
      );
    }

    const payload =
      normalizeAdmissionPayload(
        req.body || {}
      );

    const existing =
      await Student.findOne({
        where: {
          userId,
        },
      });

    if (!existing) {
      return fail(
        res,
        "Student record not found",
        404
      );
    }

    existing.renewal_date =
      new Date();

    if (
      payload.semester_no != null
    ) {
      existing.semester_no =
        payload.semester_no;
    }

    if (
      payload.phone !== undefined
    ) {
      existing.phone =
        payload.phone;
    }

    if (
      payload.whatsapp !== undefined
    ) {
      existing.whatsapp =
        payload.whatsapp;
    }

    if (
      payload.address !== undefined
    ) {
      existing.address =
        payload.address;
    }

    if (
      payload.city !== undefined
    ) {
      existing.city =
        payload.city;
    }

    if (
      payload.district !== undefined
    ) {
      existing.district =
        payload.district;
    }

    if (
      payload.province !== undefined
    ) {
      existing.province =
        payload.province;
    }

    if (
      payload.remarks !== undefined
    ) {
      existing.remarks =
        payload.remarks;
    }

    existing.status = "pending";

    existing.semester_status =
      "pending";

    await existing.save();

    return ok(res, existing);
  } catch (error) {
    console.error(
      "createRenewal error:",
      error
    );

    return fail(
      res,
      error?.parent?.sqlMessage ||
        "Failed to submit renewal request",
      500
    );
  }
};

// ======================================================
// STUDENT: UPDATE OWN PROFILE
// ======================================================

export const updateMyProfile = async (
  req,
  res
) => {
  try {
    const userId =
      getAuthenticatedUserId(req);

    if (!userId) {
      return fail(
        res,
        "User ID missing from authentication token",
        401
      );
    }

    const item =
      await Student.findOne({
        where: {
          userId,
        },
      });

    if (!item) {
      return fail(
        res,
        "Student record not found",
        404
      );
    }

    const payload =
      normalizeAdmissionPayload(
        req.body || {}
      );

    const selfEditableFields = [
      "phone",
      "whatsapp",
      "emergency_contact_name",
      "emergency_contact_phone",
      "address",
      "city",
      "district",
      "province",
      "activities",
      "medical_condition",
      "remarks",
    ];

    const updateData =
      pickAllowedFields(
        payload,
        selfEditableFields
      );

    for (
      const [field, value]
      of Object.entries(updateData)
    ) {
      item[field] = value;
    }

    await item.save();

    return ok(res, {
      message:
        "Profile updated successfully",
      student: item,
    });
  } catch (error) {
    console.error(
      "updateMyProfile error:",
      error
    );

    return fail(
      res,
      error?.parent?.sqlMessage ||
        "Failed to update profile",
      500
    );
  }
};

// ======================================================
// STUDENT: UPLOAD PROFILE IMAGE
// ======================================================

export const uploadMyProfileImage =
  async (req, res) => {
    try {
      const userId =
        getAuthenticatedUserId(req);

      if (!userId) {
        return fail(
          res,
          "User ID missing from authentication token",
          401
        );
      }

      const file =
        req.file ||
        req.files?.profileImage?.[0] ||
        req.files?.profile_image?.[0];

      if (!file) {
        return fail(
          res,
          "Profile image is required",
          400
        );
      }

      const item =
        await Student.findOne({
          where: {
            userId,
          },
        });

      if (!item) {
        return fail(
          res,
          "Submit admission form before uploading profile image",
          404
        );
      }

      item.profile_image_url =
        getUploadedFilePath(file);

      await item.save();

      return ok(res, {
        message:
          "Profile image updated successfully",
        profileImage:
          item.profile_image_url,
        student: item,
      });
    } catch (error) {
      console.error(
        "uploadMyProfileImage error:",
        error
      );

      return fail(
        res,
        error?.parent?.sqlMessage ||
          "Failed to upload profile image",
        500
      );
    }
  };

// ======================================================
// STUDENT: UPLOAD DOCUMENTS
// ======================================================

export const uploadMyDocuments =
  async (req, res) => {
    try {
      const userId =
        getAuthenticatedUserId(req);

      if (!userId) {
        return fail(
          res,
          "User ID missing from authentication token",
          401
        );
      }

      const item =
        await Student.findOne({
          where: {
            userId,
          },
        });

      if (!item) {
        return fail(
          res,
          "Submit admission form before uploading documents",
          404
        );
      }

      const payload =
        applyUploadedFiles({}, req);

      const documentFields = [
        "profile_image_url",
        "student_document_url",
        "father_cnic_document_url",
        "educational_document_url",
      ];

      let updated = false;

      for (
        const field
        of documentFields
      ) {
        if (payload[field]) {
          item[field] =
            payload[field];

          updated = true;
        }
      }

      if (!updated) {
        return fail(
          res,
          "No document was uploaded",
          400
        );
      }

      await item.save();

      return ok(res, {
        message:
          "Student documents uploaded successfully",
        student: item,
      });
    } catch (error) {
      console.error(
        "uploadMyDocuments error:",
        error
      );

      return fail(
        res,
        error?.parent?.sqlMessage ||
          "Failed to upload student documents",
        500
      );
    }
  };

// ======================================================
// ADMIN: UPDATE STUDENT
// ======================================================

export const updateStudent = async (
  req,
  res
) => {
  try {
    const id = Number(req.params.id);

    if (
      !Number.isInteger(id) ||
      id <= 0
    ) {
      return fail(
        res,
        "Invalid student ID",
        400
      );
    }

    let payload =
      normalizeAdmissionPayload(
        req.body || {}
      );

    payload = applyUploadedFiles(
      payload,
      req
    );

    const item =
      await Student.findByPk(id);

    if (!item) {
      return fail(
        res,
        "Student not found",
        404
      );
    }

    if (
      payload.status !== undefined &&
      payload.status !== null &&
      !ADMISSION_STATUSES.includes(
        payload.status
      )
    ) {
      return fail(
        res,
        "Invalid admission status",
        400
      );
    }

    if (
      payload.semester_status !==
        undefined &&
      payload.semester_status !== null &&
      !SEMESTER_STATUSES.includes(
        payload.semester_status
      )
    ) {
      return fail(
        res,
        "Invalid semester status",
        400
      );
    }

    if (
      payload.course_applied_for !==
        undefined &&
      payload.course_applied_for !==
        null &&
      !COURSES.includes(
        payload.course_applied_for
      )
    ) {
      return fail(
        res,
        "Invalid course selected",
        400
      );
    }

    if (
      payload.course_applied_for ===
        "Other" &&
      !payload.other_course
    ) {
      return fail(
        res,
        "Please enter the other course name",
        400
      );
    }

    const updateData =
      pickAllowedFields(payload);

    for (
      const [field, value]
      of Object.entries(updateData)
    ) {
      item[field] = value;
    }

    await item.save();

    return ok(res, item);
  } catch (error) {
    console.error(
      "updateStudent error:",
      error
    );

    console.error(
      "updateStudent SQL error:",
      error?.parent?.sqlMessage
    );

    return fail(
      res,
      error?.parent?.sqlMessage ||
        "Failed to update student",
      500
    );
  }
};

// ======================================================
// ADMIN: DELETE STUDENT
// ======================================================

export const deleteStudent = async (
  req,
  res
) => {
  try {
    const id = Number(req.params.id);

    if (
      !Number.isInteger(id) ||
      id <= 0
    ) {
      return fail(
        res,
        "Invalid student ID",
        400
      );
    }

    const deleted =
      await Student.destroy({
        where: {
          id,
        },
      });

    if (!deleted) {
      return fail(
        res,
        "Student not found",
        404
      );
    }

    return ok(res, {
      message:
        "Student deleted successfully",
    });
  } catch (error) {
    console.error(
      "deleteStudent error:",
      error
    );

    return fail(
      res,
      error?.parent?.sqlMessage ||
        "Failed to delete student",
      500
    );
  }
};