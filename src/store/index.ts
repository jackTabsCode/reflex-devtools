/// <reference types="@rbxts/types/plugin" />

import { UseProducerHook, UseSelectorHook, useProducer, useSelector } from "@rbxts/react-reflex"
import { CombineProducers, combineProducers } from "@rbxts/reflex"
import { host } from "./host"
import { widget } from "./widget"

const slices = { widget, host }

export type Producer = CombineProducers<typeof slices>

export const useRootProducer: UseProducerHook<Producer> = useProducer
export const useRootSelector: UseSelectorHook<Producer> = useSelector

export const store = combineProducers(slices)
