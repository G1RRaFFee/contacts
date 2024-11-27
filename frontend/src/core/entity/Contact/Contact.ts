export class Contact {
  constructor(
    readonly id: string,
    readonly name: string,
    readonly phone?: string,
    readonly website?: string,
    readonly birthday?: string,
    readonly address?: string,
    readonly email?: string,
    readonly company?: string,
    readonly notes?: string[],
    readonly tags?: string[],
    readonly groups?: string[],
    readonly imageUrl?: string
  ) {}
}
