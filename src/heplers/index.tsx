
import { nanoid } from "nanoid/non-secure"
import { IColor, IIcon } from "../../types"

const palette = {
    yellow: "#CCC68E", // Sarı pastel tonu
    pink: "#F6AAC6", // Pembe pastel tonu
    green: "#9BE4A2", // Yeşil pastel tonu
    red: "#A5616C", // Kırmızı pastel tonu
    purple: "#C7A1C2", // Mor pastel tonu
    orange: "#F6C8A4", // Turuncu pastel tonu
    blue: "#A6D2E1", // Mavi pastel tonu
};
export const getColors = () => {
    const colors: IColor[] = Object.keys(palette).map((_paletteItem) => {
        return {
            id: `color_${Math.random().toString(36).substr(2, 9)}`, // nanoid yerine basit bir ID
            code: palette[_paletteItem as keyof typeof palette],
            name: _paletteItem,
        };
    });
    return colors;
};


export const ICON_SET = {
    JavaScript: "🟨", // Sarı kare veya JS sembolü
    Python: "🐍", // Python için yılan sembolü
    Java: "☕", // Java için kahve fincanı
    "C#": "🔵", // C# için mavi daire
    "C++": "💻", // C++ için laptop sembolü
};


export const getIcons = () => {
    const icons: IIcon[] = Object.keys(ICON_SET).map((_icon) => {
        return {
            id: `icon_${nanoid()}`,
            name: _icon,
            symbol: ICON_SET[_icon as keyof typeof ICON_SET],
        }
    })
    return icons
}

export const getGreeting = ({ hour }: { hour: number }) => {
    if (hour < 12) {
        return "morning"
    }
    if (hour < 18) {
        return "evening"
    } else {
        return "night"
    }
}