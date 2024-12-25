
import { nanoid } from "nanoid/non-secure"
import { IColor, IIcon } from "../../types"

const palette = {
    yellow500: "#FFD700", // Sarı (Drink plenty of Water)
    pink500: "#FF69B4", // Pembe (Eat a healthy breakfast)
    green500: "#32CD32", // Yeşil (Take vitamins)
    red500: "#ef4444", // Kırmızı (Örnek)
    red600: "#dc2626",
    orange300: "#fdba74",
    orange400: "#fb923c",
    sky400: "#38bdf8",
    sky500: "#0ea5e9",
    purple500: "#a855f7",
    purple600: "#9333ea",
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