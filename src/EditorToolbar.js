import React from "react";
import { Quill } from "react-quill";

// Add fonts to whitelist and register them
const Font = Quill.import("formats/font");
Font.whitelist = [
    "Georgia",
    "Courier",
];

Quill.register(Font, true);

// Modules object for setting up the Quill editor
export const modules = {
    toolbar: {
        container: "#toolbar"
    }
};

// Formats objects for setting up the Quill editor
export const formats = [
    "header",
    "font",
    "bold",
    "italic",
    "underline",
    "strike",
    "script",
    "blockquote",
    "background",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "color",
    "code-block"
];

// Quill Toolbar component
export const QuillToolbar = () => (
    <div id="toolbar">
        <span className="ql-formats">
            <select className="ql-font" defaultValue="arial">
                <option value="Georgia">Georgia</option>
                <option value="Courier">Courier</option>
            </select>
            <select className="ql-header" defaultValue="3">
                <option value="2">Heading</option>
                <option value="3">Subheading</option>
                <option value="4">Normal</option>
            </select>
        </span>
        <span className="ql-formats">
            <button className="ql-bold" />
            <button className="ql-italic" />
            <button className="ql-underline" />
            <button className="ql-strike" />
        </span>
        <span className="ql-formats">
            <button className="ql-list" value="ordered" />
            <button className="ql-list" value="bullet" />
            <button className="ql-indent" value="-1" />
            <button className="ql-indent" value="+1" />
        </span>
        <span className="ql-formats">
            <button className="ql-script" value="super" />
            <button className="ql-script" value="sub" />
            <button className="ql-blockquote" />
        </span>
        <span className="ql-formats">
            <select className="ql-color" />
            <select className="ql-background" />
        </span>
        <span className="ql-formats">
            <button className="ql-link" />
            <button className="ql-image" />
            <button className="ql-video" />
        </span>
        <span className="ql-formats">
            <button className="ql-formula" />
            <button className="ql-code-block" />
            <button className="ql-clean" />
        </span>
        <span className="ql-formats">
        </span>
    </div>
);

export default QuillToolbar;