/// <reference types="@rbxts/types/plugin" />

import { UseProducerHook, UseSelectorHook, useProducer, useSelector } from "@rbxts/react-reflex"
import { CombineProducers, combineProducers } from "@rbxts/reflex"
import { _game } from "./game"
import { widget } from "./widget"

const slices = { widget, game: _game }

export type Store = CombineProducers<typeof slices>

export const useRootProducer: UseProducerHook<Store> = useProducer
export const useRootSelector: UseSelectorHook<Store> = useSelector

export const store = combineProducers(slices)
