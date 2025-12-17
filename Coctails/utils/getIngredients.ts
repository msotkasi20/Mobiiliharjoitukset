import { Drink } from "../types/cocktailTypes"

export function getIngredients(drink: Drink): string[] { 
  const ingredients: string[] = []

  for (let i = 1; i <= 15; i++) { 
    const ing = drink[`strIngredient${i}`] 
    const measure = drink[`strMeasure${i}`]
    if (ing && typeof ing === 'string' && ing.trim() !== '') { 
      ingredients.push(measure ? `${measure.trim()} ${ing.trim()}` : ing.trim())
    } 
  } 
  return ingredients 
} 