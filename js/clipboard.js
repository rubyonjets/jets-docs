document.addEventListener('DOMContentLoaded', function () {
  // Find all pre elements with the highlight class
  var codeBlocks = document.querySelectorAll('div.highlight');

  codeBlocks.forEach(function (block) {
    // Check if a copy button already exists within the block
    if (!block.querySelector('.clipboard-button')) {
      // Create the copy button
      var copyButton = document.createElement('button');
      copyButton.className = 'clipboard-button';
      copyButton.textContent = 'Copy';
      block.appendChild(copyButton);

      copyButton.addEventListener('click', function () {
        // Find the code block within the container
        var codeBlock = block.querySelector('code').innerText.trim(); // Trim the text to remove extra newlines

        // Create a temporary textarea element
        var textarea = document.createElement('textarea');
        textarea.value = codeBlock;
        document.body.appendChild(textarea);

        // Select the text in the textarea
        textarea.select();
        textarea.setSelectionRange(0, 99999); // For mobile devices

        // Copy the text to the clipboard
        document.execCommand('copy');

        // Remove the temporary textarea
        document.body.removeChild(textarea);

        // Update the button text to "Copied"
        var originalText = copyButton.textContent;
        copyButton.textContent = 'Copied';

        // Revert the button text back to "Copy" after 2 seconds
        setTimeout(function () {
          copyButton.textContent = originalText;
        }, 2000);
      });
    }
  });
});
