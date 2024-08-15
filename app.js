document.addEventListener('DOMContentLoaded', function() {
    // Handle Login Form Submission
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const username = document.getElementById('username').value.trim();
            const password = document.getElementById('password').value.trim();

            if (username && password) {
                window.location.href = 'index.html';
            } else {
                alert('Please enter a valid username and password.');
            }
        });
    }

    // Handle the index.html flow
    const startButton = document.getElementById('startButton');
    const welcomeScreen = document.getElementById('welcomeScreen');
    const loadingScreen = document.getElementById('loadingScreen');
    const conflictResolutionScreen = document.getElementById('conflictResolutionScreen');
    const acceptResponsibilityScreen = document.getElementById('acceptResponsibilityScreen'); // New screen
    const identifyTriggersScreen = document.getElementById('identifyTriggersScreen'); // New screen

    if (startButton) {
        startButton.addEventListener('click', function() {
            welcomeScreen.classList.remove('active');
            loadingScreen.classList.add('active');

            setTimeout(function() {
                loadingScreen.classList.remove('active');
                conflictResolutionScreen.classList.add('active');
            }, 3000);
        });
    }

    // Handle Conflict Resolution Form Submission
    const form = document.getElementById('feelingsForm');
    const feelingsList = document.getElementById('feelingsList');
    const modal = document.getElementById('modal');
    const closeButton = document.querySelector('.close-button');
    const reviewButton = document.getElementById('reviewButton');
    const saveAndProgressFromModal = document.getElementById('saveAndProgressFromModal'); // Check for this button

    // Initially hide the review and progress buttons
    reviewButton.style.display = 'none';

    // Create and configure the Save and Progress button
    const saveAndProgressBelowReview = document.createElement('button');
    saveAndProgressBelowReview.textContent = "Save and Progress";
    saveAndProgressBelowReview.classList.add('progress-button'); // Add the same class for consistent styling
    saveAndProgressBelowReview.style.display = 'none'; // Initially hidden
    reviewButton.insertAdjacentElement('beforebegin', saveAndProgressBelowReview); // Place it above the review button

    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent form submission
            const feelingsInput = document.getElementById('feelingsInput');
            const feelingsText = feelingsInput.value.trim();

            if (feelingsText !== "") {
                reviewButton.style.display = 'block';
                saveAndProgressBelowReview.style.display = 'block'; // Show the save and progress button

                const li = document.createElement('li');
                li.textContent = feelingsText;

                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'X';
                deleteButton.addEventListener('click', function() {
                    const confirmDelete = confirm('Do you really want to withdraw this feeling?');
                    if (confirmDelete) {
                        li.remove();
                        if (feelingsList.children.length === 0) {
                            reviewButton.style.display = 'none';
                            saveAndProgressBelowReview.style.display = 'none'; // Hide the save and progress button
                            modal.style.display = 'none';
                        }
                    }
                });

                li.appendChild(deleteButton);
                feelingsList.appendChild(li);
                feelingsInput.value = '';
            } else {
                alert('Please enter your feelings before submitting.');
            }
        });

        reviewButton.addEventListener('click', function() {
            if (feelingsList.children.length > 0) {
                modal.style.display = 'flex';
            } else {
                alert('No feelings have been submitted yet.');
            }
        });

        closeButton.addEventListener('click', function() {
            modal.style.display = 'none';
        });

        window.addEventListener('click', function(event) {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });
    }

    // Transition to Accept Responsibility Screen from Modal
    if (saveAndProgressFromModal) {
        saveAndProgressFromModal.addEventListener('click', function() {
            modal.style.display = 'none';
            conflictResolutionScreen.classList.remove('active');
            acceptResponsibilityScreen.classList.add('active');
        });
    }

    // Transition to Accept Responsibility Screen from Below Review
    saveAndProgressBelowReview.addEventListener('click', function() {
        conflictResolutionScreen.classList.remove('active');
        acceptResponsibilityScreen.classList.add('active');
    });

    // Back button functionality for Accept Responsibility Screen
    const backButton = document.createElement('button');
    backButton.textContent = "Back";
    backButton.classList.add('back-button');
    acceptResponsibilityScreen.appendChild(backButton);

    backButton.addEventListener('click', function() {
        acceptResponsibilityScreen.classList.remove('active');
        conflictResolutionScreen.classList.add('active');
    });

    // Logout functionality
    const logoutButton = document.getElementById('logoutButton');
    if (logoutButton) {
        logoutButton.addEventListener('click', function() {
            window.location.href = 'login.html';
        });
    }

    // Handle Accept Responsibility dropdown and save button
    const responsibilitySelect = document.getElementById('responsibilitySelect');
    const saveAndProgressButton = document.getElementById('nextButton');
    saveAndProgressButton.textContent = "Save and Progress"; // Update the button text

    saveAndProgressButton.addEventListener('click', function() {
        const selectedValue = responsibilitySelect.value;
        if (selectedValue !== "blank") {
            acceptResponsibilityScreen.classList.remove('active');
            identifyTriggersScreen.classList.add('active');
        } else {
            alert('Please select a responsibility before progressing.');
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const triggers = [
        "Avoidance", "Blame", "Criticism", "Disrespect", "Exclusion", "Fear of conflict",
        "Guilt-tripping", "Hostility", "Interruptions", "Judgment", "Kidding in a hurtful way",
        "Lack of empathy", "Mocking", "Nagging", "Overreacting", "Passive aggression",
        "Questioning intentions", "Raised voice", "Sarcasm", "Threats", "Undermining", 
        "Victim mentality", "Withholding", "Xenophobia", "Yelling", "Zoning out"
    ]; // Example triggers covering A-Z

    const triggerInput = document.getElementById('triggerInput');
    const suggestionsList = document.getElementById('suggestionsList');
    const identifiedTriggersList = document.getElementById('identifiedTriggersList');
    const saveTriggerButton = document.getElementById('saveTriggerButton');

    // Function to filter and show suggestions
    triggerInput.addEventListener('input', function() {
        const input = triggerInput.value.toLowerCase();
        suggestionsList.innerHTML = ''; // Clear previous suggestions

        if (input) {
            const filteredTriggers = triggers.filter(trigger => trigger.toLowerCase().includes(input));
            filteredTriggers.forEach(trigger => {
                const li = document.createElement('li');
                li.textContent = trigger;
                li.addEventListener('click', function() {
                    triggerInput.value = trigger;
                    suggestionsList.innerHTML = ''; // Clear suggestions once selected
                });
                suggestionsList.appendChild(li);
            });
        }
    });

    // Function to save selected or typed trigger
    saveTriggerButton.addEventListener('click', function() {
        const trigger = triggerInput.value.trim();
        if (trigger) {
            const li = document.createElement('li');
            li.textContent = trigger;
            identifiedTriggersList.appendChild(li);
            triggerInput.value = ''; // Clear the input field after saving
            suggestionsList.innerHTML = ''; // Clear suggestions
        }
    });
});
document.addEventListener('DOMContentLoaded', function() {
    const triggers = [
        "Avoidance", "Blame", "Criticism", "Disrespect", "Exclusion", "Fear of conflict",
        "Guilt-tripping", "Hostility", "Interruptions", "Judgment", "Kidding in a hurtful way",
        "Lack of empathy", "Mocking", "Nagging", "Overreacting", "Passive aggression",
        "Questioning intentions", "Raised voice", "Sarcasm", "Threats", "Undermining", 
        "Victim mentality", "Withholding", "Xenophobia", "Yelling", "Zoning out"
    ]; // Example triggers covering A-Z

    const triggerInput = document.getElementById('triggerInput');
    const suggestionsList = document.getElementById('suggestionsList');
    const identifiedTriggersList = document.getElementById('identifiedTriggersList');
    const saveTriggerButton = document.getElementById('saveTriggerButton');

    // Function to filter and show suggestions
    triggerInput.addEventListener('input', function() {
        const input = triggerInput.value.toLowerCase();
        suggestionsList.innerHTML = ''; // Clear previous suggestions

        if (input) {
            const filteredTriggers = triggers.filter(trigger => trigger.toLowerCase().includes(input));
            filteredTriggers.forEach(trigger => {
                const li = document.createElement('li');
                li.textContent = trigger;
                li.addEventListener('click', function() {
                    triggerInput.value = trigger;
                    suggestionsList.innerHTML = ''; // Clear suggestions once selected
                });
                suggestionsList.appendChild(li);
            });
        }
    });

    // Function to save selected or typed trigger
    saveTriggerButton.addEventListener('click', function() {
        const trigger = triggerInput.value.trim();
        if (trigger) {
            const li = document.createElement('li');
            li.textContent = trigger;

            const deleteButton = document.createElement('button');
            deleteButton.textContent = '✖'; // X symbol
            deleteButton.classList.add('delete-button');
            deleteButton.addEventListener('click', function() {
                li.remove();
            });

            li.appendChild(deleteButton);
            identifiedTriggersList.appendChild(li);
            triggerInput.value = ''; // Clear the input field after saving
            suggestionsList.innerHTML = ''; // Clear suggestions
        }
    });
});