document.addEventListener('DOMContentLoaded', () => {
    let currentMember = null;
    const audioPlayer = document.getElementById('audio-player');

    
    function isVideoPath(path) {
        return typeof path === 'string' && /\.(mp4|webm|ogg)$/i.test(path);
    }

    function getVideoMimeType(path) {
        const ext = (path.split('.').pop() || '').toLowerCase();
        if (ext === 'webm') return 'video/webm';
        if (ext === 'ogg') return 'video/ogg';
        return 'video/mp4';
    }

    function renderMemberMedia(src, name) {
        if (!src) return '';
        if (isVideoPath(src)) {
            const type = getVideoMimeType(src);
            return `
                <video class="fade-in member-avatar" autoplay loop muted playsinline preload="metadata">
                    <source src="${src}" type="${type}">
                </video>
            `;
        }

        return `<img src="${src}" class="fade-in member-avatar" draggable="false" alt="${name}">`;
    }
    
    const memberInfoData = {
        paris: {
            name: 'PARIS',
            image: './assets/parisfrance.png',
            description: 'ya kurju amneziju >_<',
            track: './assets/montery.mp3'
        },
        aqero: {
            name: 'AQERO',
            image: './assets/aqero.png',
            description: 'ready to die? ▸ tg @exitapathy',
            track: './assets/aqerokiller.mp3'
        },
        euphoria: {
            name: 'EUPHORIA',
            image: './assets/graveyard.mp4',
            description: 'smiling ruins whisper your pulse back to zero.',
            track: './assets/japan.mp3'
        },
        g0th1cad3ath: {
            name: 'G0TH1CAD3ATH',
            image: './assets/wtf.mp4',
            description: 'angelmaycry',
            track: './assets/hateyou.mp3'
        },
        monteryhack: {
            name: 'MONTERYHACK',
            image: './assets/ambrobene.mp4',
            description: 'one hundred thousand dollars...',
            track: './assets/reflection.mp3'
        },
        enigma: {
            name: 'ENIGMA',
            image: './assets/haha.mp4',
            description: 'enigmafinder.net',
            track: './assets/project_61.mp3'
        },
        ceo: {
            name: 'CEO',
            image: './assets/CEO.jpg',
            description: 'ceo of your work xd.',
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
        
        const mediaHtml = renderMemberMedia(info.image, info.name);
        
        memberDiv.innerHTML = `
            ${mediaHtml}
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







