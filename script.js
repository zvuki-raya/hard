document.addEventListener('DOMContentLoaded', () => {
    let currentMember = null;
    const audioPlayer = document.getElementById('audio-player');

    const memberInfoData = {
        paris: {
            name: 'PARIS',
            image: './assets/paris.jpg',
            description: 'knock knock knock, who is?',
            track: './assets/carti.mp3'
        },
        aqero: {
            name: 'AQERO',
            image: './assets/aqero.jpg',
            description: 'ready to die? ▸ tg @exitapathy',
            track: './assets/21savage.mp3'
        },
        euphoria: {
            name: 'EUPHORIA',
            image: './assets/euphoria.jpg',
            description: 'smiling ruins whisper your pulse back to zero.',
            track: './assets/japan.mp3'
        },
        g0th1cad3ath: {
            name: 'G0TH1CAD3ATH',
            image: './assets/fuckall.jpg',
            description: 'cemetery wifi left open; every packet screams.',
            track: './assets/hateyou.mp3'
        },
        monteryhack: {
            name: 'MONTERYHACK',
            image: './assets/monteryhack.jpg',
            description: 'ports bleed; root prays; shell laughs last.',
            track: './assets/reflection.mp3'
        },
        enigma: {
            name: 'ENIGMA',
            image: './assets/enigma.jpg',
            description: 'static riddles carve sigils into your screen.',
            track: './assets/project_61.mp3'
        },
        ceo: {
            name: 'CEO',
            image: './assets/CEO.jpg',
            description: 'boardroom lights flicker; contracts bleed.',
            track: './assets/xdcute.mp3'
        },
        cataracta: {
            name: 'CATARACTA',
            image: './assets/cataracta.jpg',
            description: 'waterlogged circuits dream in rusted binary.',
            track: './assets/cute.mp3'
        }
    };

    function showMember(member) {
        const info = memberInfoData[member];
        const memberDiv = document.getElementById('member-info');
        const selectedElement = document.querySelector(`[onclick="showMember('${member}')"]`);

        if (!info) return;

        if (currentMember) {
            currentMember.classList.remove('selected');
            resetDot(currentMember.getAttribute('data-member'));
        }

        if (currentMember === selectedElement) {
            currentMember = null;
            memberDiv.innerHTML = '';
            resetMusic();
            return;
        }

        if (selectedElement) {
            selectedElement.classList.add('selected');
            selectedElement.setAttribute('data-member', member);
            currentMember = selectedElement;
        } else {
            return;
        }

        updateDots(member);

        memberDiv.innerHTML = `
            <img src="${info.image}" class="fade-in member-avatar" draggable="false" alt="${info.name}">
            <p class="member-name">[ ${info.name} ]</p>
            <hr class="member-separator">
            <p class="glitch member-description">${info.description}</p>
        `;

        playMemberMusic(info.track);
    }

    function playMemberMusic(track) {
        if (!track) return;
        const trackUrl = new URL(track, window.location.href).href;
        if (audioPlayer.src !== trackUrl) {
            audioPlayer.src = track;
            audioPlayer.play();
        }
    }

    function resetMusic() {
        const defaultTrack = './assets/main_menu.mp3';
        const defaultUrl = new URL(defaultTrack, window.location.href).href;
        if (audioPlayer.src !== defaultUrl) {
            audioPlayer.src = defaultTrack;
            audioPlayer.play();
        }
    }

    function removeOverlay() {
        const overlay = document.getElementById('overlay');
        if (overlay) overlay.style.display = 'none';
        resetMusic();
    }

    function resetDot(memberId) {
        const previousDot = document.getElementById(`${memberId}-dot`);
        if (previousDot) previousDot.innerHTML = '::';
    }

    function updateDots(member) {
        document.querySelectorAll('.yellow').forEach(dot => {
            dot.innerHTML = '::';
        });
        const currentDot = document.getElementById(`${member}-dot`);
        if (currentDot) currentDot.innerHTML = '<span class="red">•</span>';
    }

    window.removeOverlay = removeOverlay;
    window.showMember = showMember;
});
