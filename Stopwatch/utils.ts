// Formatoi aikanäyttö (muutetaan sekunnit MM:SS)
// @param seconds: sekunnit jotka formatoidaan
// @returns: formatoitu time string  MM:SS formaatissa

export const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds/ 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2,'0')}.${secs.toString().padStart(2, '0')}`
}