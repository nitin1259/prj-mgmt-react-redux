import React from "react";
import PropTypes from "prop-types";
import TextInput from "../common/TextInput";
import SelectInput from "../common/SelectInput";

function CourseForm({
  course,
  onSave,
  errors,
  authors,
  onChange,
  saving = false,
}) {
  return (
    <form onSubmit={onSave}>
      <h2>{course.id ? "Edit" : "Add "} Course</h2>
      <TextInput
        name="title"
        label="Title"
        value={course.title}
        onChange={onChange}
        error={errors.title}
      />

      <SelectInput
        name="authorId"
        label="Author"
        value={course.authorId || ""}
        defaultOption="Select Author"
        options={authors.map((author) => ({
          value: author.id,
          text: author.name,
        }))}
        onChange={onChange}
        error={errors.author}
      />

      <TextInput
        name="category"
        label="Category"
        value={course.category}
        onChange={onChange}
        error={errors.category}
      />

      <button type="submit" disabled={saving} className="btn btn-primary">
        {saving ? "Saving..." : "Save"}
      </button>
    </form>
  );
}

CourseForm.propTypes = {
  onSave: PropTypes.func.isRequired,
  course: PropTypes.object.isRequired,
  errors: PropTypes.object,
  authors: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  saving: PropTypes.bool.isRequired,
};

export default CourseForm;
