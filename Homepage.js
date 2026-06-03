 // Initialize Animate On Scroll
 AOS.init({
    once: false, // Set to FALSE so animations trigger on both scroll DOWN and UP
    offset: 100, // Offset (in px) from the original trigger point
    duration: 800, // Values from 0 to 3000, with step 50ms
    easing: 'ease-out-cubic', // Default easing for AOS animations
});

//Background Video 
document.addEventListener('DOMContentLoaded', function() {
    const video = document.getElementById('hero-video');
    const muteBtn = document.getElementById('mute-btn');
    const iconMuted = document.getElementById('icon-muted');
    const iconUnmuted = document.getElementById('icon-unmuted');

    // 1. Set initial desired state (Unmuted, 10% volume based on your code)
    video.muted = false;
    video.volume = 0.1;

    // 2. Attempt to play the video with sound
    let playPromise = video.play();

    if (playPromise !== undefined) {
        playPromise.then(_ => {
            // SUCCESS! Browser allowed audio autoplay.
            // Show the "Unmuted" (Sound Waves) icon
            iconMuted.classList.add('hidden');
            iconUnmuted.classList.remove('hidden');
        })
        .catch(error => {
            // BLOCKED! Browser prevented audio autoplay.
            // Fallback: Mute the video and play it silently so the site isn't broken.
            video.muted = true;
            video.play();
            
            // Show the "Muted" (Crossed out) icon
            iconMuted.classList.remove('hidden');
            iconUnmuted.classList.add('hidden');
            
            console.log("Browser blocked audio autoplay. Video playing muted instead.");
        });
    }

    // 3. Handle the manual mute/unmute button clicks
    muteBtn.addEventListener('click', function() {
        if (video.muted) {
            // Unmute and ensure volume is 10%
            video.muted = false; 
            video.volume = 0.05; 
            
            iconMuted.classList.add('hidden');
            iconUnmuted.classList.remove('hidden');
        } else {
            // Mute
            video.muted = true; 
            iconMuted.classList.remove('hidden');
            iconUnmuted.classList.add('hidden');
        }
    });
});


//Overview, Spec and Feature
function toggleAccordion(contentId, iconId) {
    const content = document.getElementById(contentId);
    const icon = document.getElementById(iconId);
    
    // Check if the accordion is currently open (has a max-height value)
    if (content.style.maxHeight) {
        // Close it: remove max-height, fade out, rotate arrow back
        content.style.maxHeight = null;
        content.classList.remove('opacity-100');
        content.classList.add('opacity-0');
        icon.classList.remove('rotate-180');
    } else {
        // Open it: set max-height to the scroll height, fade in, flip arrow
        content.style.maxHeight = content.scrollHeight + "px";
        content.classList.remove('opacity-0');
        content.classList.add('opacity-100');
        icon.classList.add('rotate-180');
    }
}

function selectVariant(clickedBtn) {
    // 1. Get all variant buttons
    const allVariants = document.querySelectorAll('.variant-btn');

    // 2. Loop through and reset them all to the unselected state
    allVariants.forEach(btn => {
        // Remove selected borders and background
        btn.classList.remove('ring-2', 'ring-blue-600', 'bg-blue-50/50', 'border-transparent');
        
        // Add back the unselected borders, background, and hover animations
        btn.classList.add('border-slate-200', 'bg-white', 'hover:-translate-y-1', 'hover:shadow-md');

        // Reset text color
        const textSpan = btn.querySelector('.variant-text');
        if(textSpan) {
            textSpan.classList.remove('text-blue-800', 'font-bold');
            textSpan.classList.add('text-slate-600', 'font-semibold');
        }

        // Hide the blue checkmark
        const checkIcon = btn.querySelector('.variant-check');
        if(checkIcon) {
            checkIcon.classList.add('hidden');
        }
    });

    // 3. Apply the selected state strictly to the button that was clicked
    clickedBtn.classList.remove('border-slate-200', 'bg-white', 'hover:-translate-y-1', 'hover:shadow-md');
    clickedBtn.classList.add('ring-2', 'ring-blue-600', 'bg-blue-50/50', 'border-transparent');

    // Make text blue and bold
    const selectedText = clickedBtn.querySelector('.variant-text');
    if(selectedText) {
        selectedText.classList.remove('text-slate-600', 'font-semibold');
        selectedText.classList.add('text-blue-800', 'font-bold');
    }

    // Reveal the blue checkmark
    const selectedCheck = clickedBtn.querySelector('.variant-check');
    if(selectedCheck) {
        selectedCheck.classList.remove('hidden');
    }
}

// Auto-select the first variant ("Forged Carbon") when the page loads
document.addEventListener('DOMContentLoaded', () => {
    const firstVariant = document.querySelector('.variant-btn');
    if (firstVariant) {
        selectVariant(firstVariant);
    }
});