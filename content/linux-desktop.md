# Graphic card

<https://medium.com/@peterpang_84917/personal-experience-of-installing-ubuntu-18-04-lts-on-xps-15-9570-3e53b6cfeefe>

    sudo prime-select intel
    sudo reboot

# Sound

- <https://askubuntu.com/questions/1515538/fixing-no-sound-dummy-output-issue-in-ubuntu-24-04>
- <https://askubuntu.com/questions/1406646/ubuntu-22-04-audio-output-not-working-dummy-audio>
- <https://forums.gentoo.org/viewtopic-p-8842356.html?sid=f3a1ecd3162da8ad480c7b89a9c6985c>

'snd-hda-intel’은 Linux 운영 체제에서 Intel High Definition Audio (HDA)
컨트롤러를 위한 사운드 드라이버 모듈

검사 명령어

- aplay -l
- lspci -k

<div class="formalpara">

<div class="title">

/etc/modprobe.d/audiofix.conf

</div>

    options snd-hda-intel dmic_detect=0
    options snd-hda-intel model=laptop-amic enable=yes

</div>

<div class="formalpara">

<div class="title">

/etc/modprobe.d/alsa-base.conf

</div>

    options snd-hda-intel model=generic
    options snd-hda-intel dmic_detect=0
    blacklist snd_soc_skl

</div>

<div class="formalpara">

<div class="title">

/etc/modprobe.d/blacklist.conf

</div>

    blacklist snd_soc_skl

</div>

blacklist 선언은 alsa-base.conf, blacklist.conf 둘 중에 한 곳만 하면 될
듯

## Related
