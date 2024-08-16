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
    const acceptResponsibilityScreen = document.getElementById('acceptResponsibilityScreen'); 
    const identifyTriggersScreen = document.getElementById('identifyTriggersScreen'); 
    const dashboardScreen = document.getElementById('dashboardScreen'); // Added this line

    if (startButton) {
        startButton.addEventListener('click', function() {
            console.log('Start button clicked');
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
    const saveAndProgressFromModal = document.getElementById('saveAndProgressFromModal'); 

    // Initially hide the review and progress buttons
    reviewButton.style.display = 'none';

    // Create and configure the Save and Progress button
    const saveAndProgressBelowReview = document.createElement('button');
    saveAndProgressBelowReview.textContent = "Save and Progress";
    saveAndProgressBelowReview.classList.add('progress-button'); 
    saveAndProgressBelowReview.style.display = 'none'; 
    reviewButton.insertAdjacentElement('beforebegin', saveAndProgressBelowReview); 

    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault(); 
            const feelingsInput = document.getElementById('feelingsInput');
            const feelingsText = feelingsInput.value.trim();

            if (feelingsText !== "") {
                reviewButton.style.display = 'block';
                saveAndProgressBelowReview.style.display = 'block'; 

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
                            saveAndProgressBelowReview.style.display = 'none'; 
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
    saveAndProgressButton.textContent = "Save and Progress"; 

    saveAndProgressButton.addEventListener('click', function() {
        const selectedValue = responsibilitySelect.value;
        if (selectedValue !== "blank") {
            acceptResponsibilityScreen.classList.remove('active');
            identifyTriggersScreen.classList.add('active');
        } else {
            alert('Please select a responsibility before progressing.');
        }
    });

    // Section for handling Triggers
    const triggers = [
        "Avoidance", "Blame", "Criticism", "Disrespect", "Exclusion", "Fear of conflict",
        "Guilt-tripping", "Hostility", "Interruptions", "Judgment", "Kidding in a hurtful way",
        "Lack of empathy", "Mocking", "Nagging", "Overreacting", "Passive aggression",
        "Questioning intentions", "Raised voice", "Sarcasm", "Threats", "Undermining", 
        "Victim mentality", "Withholding", "Xenophobia", "Yelling", "Zoning out"
    ]; 

    const triggerInput = document.getElementById('triggerInput');
    const suggestionsList = document.getElementById('suggestionsList');
    const identifiedTriggersList = document.getElementById('identifiedTriggersList');
    const saveTriggerButton = document.getElementById('saveTriggerButton');
    const backButtonTriggers = document.getElementById('backButton'); // Back button for Identify Triggers Screen
    const reviewEventButton = document.getElementById('reviewEventButton'); // Added this line

    // Function to filter and show suggestions
    triggerInput.addEventListener('input', function() {
        const input = triggerInput.value.toLowerCase();
        suggestionsList.innerHTML = ''; 

        if (input) {
            const filteredTriggers = triggers.filter(trigger => trigger.toLowerCase().includes(input));
            filteredTriggers.forEach(trigger => {
                const li = document.createElement('li');
                li.textContent = trigger;
                li.addEventListener('click', function() {
                    triggerInput.value = trigger;
                    suggestionsList.innerHTML = ''; 
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
            deleteButton.textContent = '✖'; 
            deleteButton.classList.add('delete-button');
            deleteButton.addEventListener('click', function() {
                li.remove();
                if (identifiedTriggersList.children.length === 0) {
                    reviewEventButton.style.display = 'none'; // Hide the Review Event button if no triggers remain
                }
            });

            li.appendChild(deleteButton);
            identifiedTriggersList.appendChild(li);
            triggerInput.value = ''; 
            suggestionsList.innerHTML = ''; 

            // Show the Review Event button if at least one trigger is saved
            if (identifiedTriggersList.children.length > 0) {
                reviewEventButton.style.display = 'block';
            }
        }
    });

    // Back button functionality for Identify Triggers Screen
    backButtonTriggers.addEventListener('click', function() {
        identifyTriggersScreen.classList.remove('active');
        acceptResponsibilityScreen.classList.add('active');
    });

    // Handle Review Event button click
    reviewEventButton.addEventListener('click', function() {
        identifyTriggersScreen.classList.remove('active');
        dashboardScreen.classList.add('active');
        updateDashboard(); 
    });

    // Add a function to update the dashboard with the collected data
    function updateDashboard() {
        const dashboardFeelingsList = document.getElementById('dashboardFeelingsList');
        const dashboardResponsibility = document.getElementById('dashboardResponsibility');
        const dashboardTriggersList = document.getElementById('dashboardTriggersList');

        // Populate the dashboard with collected data
        dashboardFeelingsList.innerHTML = ''; 
        Array.from(feelingsList.children).forEach(item => {
            const li = document.createElement('li');
            li.textContent = item.textContent.replace('X', '').trim();
            dashboardFeelingsList.appendChild(li);
        });

        // Get the selected option's text for responsibility
        const selectedResponsibilityOption = responsibilitySelect.options[responsibilitySelect.selectedIndex].text;
        dashboardResponsibility.textContent = selectedResponsibilityOption;

        dashboardTriggersList.innerHTML = ''; 
        Array.from(identifiedTriggersList.children).forEach(item => {
            const li = document.createElement('li');
            li.textContent = item.textContent.replace('✖', '').trim();
            dashboardTriggersList.appendChild(li);
        });
    }

    // Back button functionality for Dashboard Screen
    const backToTriggersButton = document.getElementById('backToTriggersButton');
    backToTriggersButton.addEventListener('click', function() {
        dashboardScreen.classList.remove('active');
        identifyTriggersScreen.classList.add('active');
    });
});

