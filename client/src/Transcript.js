import React, { useState } from 'react';

function Transcript(descriptionPlaceholder, setDescriptionPlaceholder) {

  return (
    <div className="questionBox">
      <div className="questionBoxText">
        <textarea
          defaultValue={descriptionPlaceholder}
          onChange={(e) => setDescriptionPlaceholder(e.target.value)}
          name="description"
          className="textareaInput"
          rows="10"
        ></textarea>
      </div>
    </div>
  );
}

export default Transcript;