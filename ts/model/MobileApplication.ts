import { Enum, Int, OneOf } from '@stack-spot/open-api-dsl'
import { Application } from './Application.complete'

export const MobileOperatingSystem = Enum('MobileOperatingSystem', ['ios', 'android'])

export const MobileApplication = Application.extend('MobileApplication', {
    os: MobileOperatingSystem,
    minOSVersion: OneOf(Int.min(0), String),
    maxOSVersion: OneOf(Int.min(0), String).optional(),
})
