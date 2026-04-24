import { Student } from "../models/index.js";
import { ok, fail } from "../utils/response.js";

const normalizeAdmissionPayload = (payload = {}) => {
  const normalized = { ...payload };

  if (normalized.age != null && normalized.age !== "") {
    normalized.age = Number(normalized.age);
  }

  if (normalized.semester_no != null && normalized.semester_no !== "") {
    normalized.semester_no = Number(normalized.semester_no);
  }

  if (normalized.hostel_required != null) {
    normalized.hostel_required =
      normalized.hostel_required === true ||
      normalized.hostel_required === "true" ||
      normalized.hostel_required === 1 ||
      normalized.hostel_required === "1";
  }

  if (normalized.transport_required != null) {
    normalized.transport_required =
      normalized.transport_required === true ||
      normalized.transport_required === "true" ||
      normalized.transport_required === 1 ||
      normalized.transport_required === "1";
  }

  return normalized;
};

export const listStudents = async (req, res) => {
  const data = await Student.findAll({ order: [["createdAt", "DESC"]] });
  ok(res, data);
};

// Student can view their own record
export const getMyStudentRecord = async (req, res) => {
  const item = await Student.findOne({ where: { userId: req.user.id } });
  ok(res, item);
};

// Admission form submit (student user)
export const createAdmission = async (req, res) => {
  try {
    const payload = normalizeAdmissionPayload(req.body || {});

    if (!payload.name) return fail(res, "Student name is required", 400);
    if (!payload.father_name) return fail(res, "Father / guardian name is required", 400);
    if (!payload.phone && !payload.whatsapp_number) {
      return fail(res, "At least one contact number is required", 400);
    }

    const item = await Student.create({
      ...payload,
      status: "pending",
      admission_date: payload.admission_date || new Date(),
      semester_no: payload.semester_no || 1,
      course_applied_for: payload.course_applied_for || "درس نظامی",
      userId: req.user.role === "student" ? req.user.id : payload.userId,
      createdBy: req.user.id,
    });

    ok(res, item);
  } catch (e) {
    console.error("createAdmission error:", e);
    fail(res, "Failed to submit admission form");
  }
};

// Renewal request (student user)
export const createRenewal = async (req, res) => {
  try {
    const payload = normalizeAdmissionPayload(req.body || {});
    const where = { userId: req.user.id };
    const existing = await Student.findOne({ where });
    if (!existing) return fail(res, "Student record not found", 404);

    existing.renewal_date = new Date();
    if (payload.semester_no != null) existing.semester_no = payload.semester_no;
    if (payload.phone) existing.phone = payload.phone;
    if (payload.whatsapp_number) existing.whatsapp_number = payload.whatsapp_number;
    if (payload.address) existing.address = payload.address;
    if (payload.remarks) existing.remarks = payload.remarks;
    existing.status = "pending";
    await existing.save();

    ok(res, existing);
  } catch (e) {
    console.error("createRenewal error:", e);
    fail(res, "Failed to submit renewal request");
  }
};

// Admin updates status / semester / profile fields
export const updateStudent = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const payload = normalizeAdmissionPayload(req.body || {});
    const item = await Student.findByPk(id);
    if (!item) return fail(res, "Student not found", 404);

    const editableFields = [
      "name",
      "father_name",
      "date_of_birth",
      "age",
      "gender",
      "marital_status",
      "student_b_form_or_cnic",
      "cnic",
      "guardian_name",
      "guardian_profession",
      "guardian_phone",
      "guardian_cnic",
      "guardian_relation",
      "guarantor_name",
      "guarantor_profession",
      "guarantor_phone",
      "phone",
      "whatsapp_number",
      "emergency_contact_name",
      "emergency_contact_phone",
      "address",
      "city",
      "district",
      "province",
      "dini_education",
      "asri_education",
      "previous_dini_institute",
      "previous_asri_institute",
      "previous_class_or_degree",
      "course_applied_for",
      "other_activities",
      "medical_condition",
      "hostel_required",
      "transport_required",
      "passport_photo_url",
      "document_notes",
      "status",
      "remarks",
      "semester_no",
    ];

    for (const field of editableFields) {
      if (payload[field] !== undefined) {
        item[field] = payload[field];
      }
    }

    await item.save();
    ok(res, item);
  } catch (e) {
    console.error("updateStudent error:", e);
    fail(res, "Failed to update student");
  }
};
