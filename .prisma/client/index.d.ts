
/**
 * Client
**/

import * as runtime from '@prisma/client/runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Client
 * 
 */
export type Client = $Result.DefaultSelection<Prisma.$ClientPayload>
/**
 * Model Patient
 * 
 */
export type Patient = $Result.DefaultSelection<Prisma.$PatientPayload>
/**
 * Model Vet
 * 
 */
export type Vet = $Result.DefaultSelection<Prisma.$VetPayload>
/**
 * Model Visit
 * 
 */
export type Visit = $Result.DefaultSelection<Prisma.$VisitPayload>
/**
 * Model Appointment
 * 
 */
export type Appointment = $Result.DefaultSelection<Prisma.$AppointmentPayload>
/**
 * Model ClinicConfig
 * 
 */
export type ClinicConfig = $Result.DefaultSelection<Prisma.$ClinicConfigPayload>

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Clients
 * const clients = await prisma.client.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Clients
   * const clients = await prisma.client.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb, ExtArgs>

      /**
   * `prisma.client`: Exposes CRUD operations for the **Client** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Clients
    * const clients = await prisma.client.findMany()
    * ```
    */
  get client(): Prisma.ClientDelegate<ExtArgs>;

  /**
   * `prisma.patient`: Exposes CRUD operations for the **Patient** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Patients
    * const patients = await prisma.patient.findMany()
    * ```
    */
  get patient(): Prisma.PatientDelegate<ExtArgs>;

  /**
   * `prisma.vet`: Exposes CRUD operations for the **Vet** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Vets
    * const vets = await prisma.vet.findMany()
    * ```
    */
  get vet(): Prisma.VetDelegate<ExtArgs>;

  /**
   * `prisma.visit`: Exposes CRUD operations for the **Visit** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Visits
    * const visits = await prisma.visit.findMany()
    * ```
    */
  get visit(): Prisma.VisitDelegate<ExtArgs>;

  /**
   * `prisma.appointment`: Exposes CRUD operations for the **Appointment** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Appointments
    * const appointments = await prisma.appointment.findMany()
    * ```
    */
  get appointment(): Prisma.AppointmentDelegate<ExtArgs>;

  /**
   * `prisma.clinicConfig`: Exposes CRUD operations for the **ClinicConfig** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ClinicConfigs
    * const clinicConfigs = await prisma.clinicConfig.findMany()
    * ```
    */
  get clinicConfig(): Prisma.ClinicConfigDelegate<ExtArgs>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError
  export import NotFoundError = runtime.NotFoundError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics 
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 5.22.0
   * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Client: 'Client',
    Patient: 'Patient',
    Vet: 'Vet',
    Visit: 'Visit',
    Appointment: 'Appointment',
    ClinicConfig: 'ClinicConfig'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.InternalArgs, clientOptions: PrismaClientOptions }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], this['params']['clientOptions']>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> = {
    meta: {
      modelProps: "client" | "patient" | "vet" | "visit" | "appointment" | "clinicConfig"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Client: {
        payload: Prisma.$ClientPayload<ExtArgs>
        fields: Prisma.ClientFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ClientFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ClientFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientPayload>
          }
          findFirst: {
            args: Prisma.ClientFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ClientFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientPayload>
          }
          findMany: {
            args: Prisma.ClientFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientPayload>[]
          }
          create: {
            args: Prisma.ClientCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientPayload>
          }
          createMany: {
            args: Prisma.ClientCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ClientCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientPayload>[]
          }
          delete: {
            args: Prisma.ClientDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientPayload>
          }
          update: {
            args: Prisma.ClientUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientPayload>
          }
          deleteMany: {
            args: Prisma.ClientDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ClientUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ClientUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientPayload>
          }
          aggregate: {
            args: Prisma.ClientAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateClient>
          }
          groupBy: {
            args: Prisma.ClientGroupByArgs<ExtArgs>
            result: $Utils.Optional<ClientGroupByOutputType>[]
          }
          count: {
            args: Prisma.ClientCountArgs<ExtArgs>
            result: $Utils.Optional<ClientCountAggregateOutputType> | number
          }
        }
      }
      Patient: {
        payload: Prisma.$PatientPayload<ExtArgs>
        fields: Prisma.PatientFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PatientFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PatientFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientPayload>
          }
          findFirst: {
            args: Prisma.PatientFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PatientFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientPayload>
          }
          findMany: {
            args: Prisma.PatientFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientPayload>[]
          }
          create: {
            args: Prisma.PatientCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientPayload>
          }
          createMany: {
            args: Prisma.PatientCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PatientCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientPayload>[]
          }
          delete: {
            args: Prisma.PatientDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientPayload>
          }
          update: {
            args: Prisma.PatientUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientPayload>
          }
          deleteMany: {
            args: Prisma.PatientDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PatientUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.PatientUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientPayload>
          }
          aggregate: {
            args: Prisma.PatientAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePatient>
          }
          groupBy: {
            args: Prisma.PatientGroupByArgs<ExtArgs>
            result: $Utils.Optional<PatientGroupByOutputType>[]
          }
          count: {
            args: Prisma.PatientCountArgs<ExtArgs>
            result: $Utils.Optional<PatientCountAggregateOutputType> | number
          }
        }
      }
      Vet: {
        payload: Prisma.$VetPayload<ExtArgs>
        fields: Prisma.VetFieldRefs
        operations: {
          findUnique: {
            args: Prisma.VetFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VetPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.VetFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VetPayload>
          }
          findFirst: {
            args: Prisma.VetFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VetPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.VetFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VetPayload>
          }
          findMany: {
            args: Prisma.VetFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VetPayload>[]
          }
          create: {
            args: Prisma.VetCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VetPayload>
          }
          createMany: {
            args: Prisma.VetCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.VetCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VetPayload>[]
          }
          delete: {
            args: Prisma.VetDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VetPayload>
          }
          update: {
            args: Prisma.VetUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VetPayload>
          }
          deleteMany: {
            args: Prisma.VetDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.VetUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.VetUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VetPayload>
          }
          aggregate: {
            args: Prisma.VetAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateVet>
          }
          groupBy: {
            args: Prisma.VetGroupByArgs<ExtArgs>
            result: $Utils.Optional<VetGroupByOutputType>[]
          }
          count: {
            args: Prisma.VetCountArgs<ExtArgs>
            result: $Utils.Optional<VetCountAggregateOutputType> | number
          }
        }
      }
      Visit: {
        payload: Prisma.$VisitPayload<ExtArgs>
        fields: Prisma.VisitFieldRefs
        operations: {
          findUnique: {
            args: Prisma.VisitFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VisitPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.VisitFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VisitPayload>
          }
          findFirst: {
            args: Prisma.VisitFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VisitPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.VisitFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VisitPayload>
          }
          findMany: {
            args: Prisma.VisitFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VisitPayload>[]
          }
          create: {
            args: Prisma.VisitCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VisitPayload>
          }
          createMany: {
            args: Prisma.VisitCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.VisitCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VisitPayload>[]
          }
          delete: {
            args: Prisma.VisitDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VisitPayload>
          }
          update: {
            args: Prisma.VisitUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VisitPayload>
          }
          deleteMany: {
            args: Prisma.VisitDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.VisitUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.VisitUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VisitPayload>
          }
          aggregate: {
            args: Prisma.VisitAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateVisit>
          }
          groupBy: {
            args: Prisma.VisitGroupByArgs<ExtArgs>
            result: $Utils.Optional<VisitGroupByOutputType>[]
          }
          count: {
            args: Prisma.VisitCountArgs<ExtArgs>
            result: $Utils.Optional<VisitCountAggregateOutputType> | number
          }
        }
      }
      Appointment: {
        payload: Prisma.$AppointmentPayload<ExtArgs>
        fields: Prisma.AppointmentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AppointmentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AppointmentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentPayload>
          }
          findFirst: {
            args: Prisma.AppointmentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AppointmentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentPayload>
          }
          findMany: {
            args: Prisma.AppointmentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentPayload>[]
          }
          create: {
            args: Prisma.AppointmentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentPayload>
          }
          createMany: {
            args: Prisma.AppointmentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AppointmentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentPayload>[]
          }
          delete: {
            args: Prisma.AppointmentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentPayload>
          }
          update: {
            args: Prisma.AppointmentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentPayload>
          }
          deleteMany: {
            args: Prisma.AppointmentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AppointmentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.AppointmentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentPayload>
          }
          aggregate: {
            args: Prisma.AppointmentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAppointment>
          }
          groupBy: {
            args: Prisma.AppointmentGroupByArgs<ExtArgs>
            result: $Utils.Optional<AppointmentGroupByOutputType>[]
          }
          count: {
            args: Prisma.AppointmentCountArgs<ExtArgs>
            result: $Utils.Optional<AppointmentCountAggregateOutputType> | number
          }
        }
      }
      ClinicConfig: {
        payload: Prisma.$ClinicConfigPayload<ExtArgs>
        fields: Prisma.ClinicConfigFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ClinicConfigFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClinicConfigPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ClinicConfigFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClinicConfigPayload>
          }
          findFirst: {
            args: Prisma.ClinicConfigFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClinicConfigPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ClinicConfigFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClinicConfigPayload>
          }
          findMany: {
            args: Prisma.ClinicConfigFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClinicConfigPayload>[]
          }
          create: {
            args: Prisma.ClinicConfigCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClinicConfigPayload>
          }
          createMany: {
            args: Prisma.ClinicConfigCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ClinicConfigCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClinicConfigPayload>[]
          }
          delete: {
            args: Prisma.ClinicConfigDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClinicConfigPayload>
          }
          update: {
            args: Prisma.ClinicConfigUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClinicConfigPayload>
          }
          deleteMany: {
            args: Prisma.ClinicConfigDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ClinicConfigUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ClinicConfigUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClinicConfigPayload>
          }
          aggregate: {
            args: Prisma.ClinicConfigAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateClinicConfig>
          }
          groupBy: {
            args: Prisma.ClinicConfigGroupByArgs<ExtArgs>
            result: $Utils.Optional<ClinicConfigGroupByOutputType>[]
          }
          count: {
            args: Prisma.ClinicConfigCountArgs<ExtArgs>
            result: $Utils.Optional<ClinicConfigCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
  }


  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type ClientCountOutputType
   */

  export type ClientCountOutputType = {
    pets: number
    appointments: number
  }

  export type ClientCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    pets?: boolean | ClientCountOutputTypeCountPetsArgs
    appointments?: boolean | ClientCountOutputTypeCountAppointmentsArgs
  }

  // Custom InputTypes
  /**
   * ClientCountOutputType without action
   */
  export type ClientCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClientCountOutputType
     */
    select?: ClientCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ClientCountOutputType without action
   */
  export type ClientCountOutputTypeCountPetsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PatientWhereInput
  }

  /**
   * ClientCountOutputType without action
   */
  export type ClientCountOutputTypeCountAppointmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AppointmentWhereInput
  }


  /**
   * Count Type PatientCountOutputType
   */

  export type PatientCountOutputType = {
    visits: number
    appointments: number
  }

  export type PatientCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    visits?: boolean | PatientCountOutputTypeCountVisitsArgs
    appointments?: boolean | PatientCountOutputTypeCountAppointmentsArgs
  }

  // Custom InputTypes
  /**
   * PatientCountOutputType without action
   */
  export type PatientCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatientCountOutputType
     */
    select?: PatientCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PatientCountOutputType without action
   */
  export type PatientCountOutputTypeCountVisitsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VisitWhereInput
  }

  /**
   * PatientCountOutputType without action
   */
  export type PatientCountOutputTypeCountAppointmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AppointmentWhereInput
  }


  /**
   * Count Type VetCountOutputType
   */

  export type VetCountOutputType = {
    visits: number
  }

  export type VetCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    visits?: boolean | VetCountOutputTypeCountVisitsArgs
  }

  // Custom InputTypes
  /**
   * VetCountOutputType without action
   */
  export type VetCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VetCountOutputType
     */
    select?: VetCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * VetCountOutputType without action
   */
  export type VetCountOutputTypeCountVisitsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VisitWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Client
   */

  export type AggregateClient = {
    _count: ClientCountAggregateOutputType | null
    _avg: ClientAvgAggregateOutputType | null
    _sum: ClientSumAggregateOutputType | null
    _min: ClientMinAggregateOutputType | null
    _max: ClientMaxAggregateOutputType | null
  }

  export type ClientAvgAggregateOutputType = {
    id: number | null
  }

  export type ClientSumAggregateOutputType = {
    id: number | null
  }

  export type ClientMinAggregateOutputType = {
    id: number | null
    firstName: string | null
    lastName: string | null
    email: string | null
    phone: string | null
    secondaryPhone: string | null
    address: string | null
    emergencyContactName: string | null
    emergencyContactPhone: string | null
    notes: string | null
    dob: Date | null
    gender: string | null
    driverLicenseState: string | null
    driverLicenseNumber: string | null
    driverLicenseExp: string | null
    clientType: string | null
    active: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ClientMaxAggregateOutputType = {
    id: number | null
    firstName: string | null
    lastName: string | null
    email: string | null
    phone: string | null
    secondaryPhone: string | null
    address: string | null
    emergencyContactName: string | null
    emergencyContactPhone: string | null
    notes: string | null
    dob: Date | null
    gender: string | null
    driverLicenseState: string | null
    driverLicenseNumber: string | null
    driverLicenseExp: string | null
    clientType: string | null
    active: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ClientCountAggregateOutputType = {
    id: number
    firstName: number
    lastName: number
    email: number
    phone: number
    secondaryPhone: number
    address: number
    emergencyContactName: number
    emergencyContactPhone: number
    notes: number
    dob: number
    gender: number
    driverLicenseState: number
    driverLicenseNumber: number
    driverLicenseExp: number
    clientType: number
    active: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ClientAvgAggregateInputType = {
    id?: true
  }

  export type ClientSumAggregateInputType = {
    id?: true
  }

  export type ClientMinAggregateInputType = {
    id?: true
    firstName?: true
    lastName?: true
    email?: true
    phone?: true
    secondaryPhone?: true
    address?: true
    emergencyContactName?: true
    emergencyContactPhone?: true
    notes?: true
    dob?: true
    gender?: true
    driverLicenseState?: true
    driverLicenseNumber?: true
    driverLicenseExp?: true
    clientType?: true
    active?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ClientMaxAggregateInputType = {
    id?: true
    firstName?: true
    lastName?: true
    email?: true
    phone?: true
    secondaryPhone?: true
    address?: true
    emergencyContactName?: true
    emergencyContactPhone?: true
    notes?: true
    dob?: true
    gender?: true
    driverLicenseState?: true
    driverLicenseNumber?: true
    driverLicenseExp?: true
    clientType?: true
    active?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ClientCountAggregateInputType = {
    id?: true
    firstName?: true
    lastName?: true
    email?: true
    phone?: true
    secondaryPhone?: true
    address?: true
    emergencyContactName?: true
    emergencyContactPhone?: true
    notes?: true
    dob?: true
    gender?: true
    driverLicenseState?: true
    driverLicenseNumber?: true
    driverLicenseExp?: true
    clientType?: true
    active?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ClientAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Client to aggregate.
     */
    where?: ClientWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Clients to fetch.
     */
    orderBy?: ClientOrderByWithRelationInput | ClientOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ClientWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Clients from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Clients.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Clients
    **/
    _count?: true | ClientCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ClientAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ClientSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ClientMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ClientMaxAggregateInputType
  }

  export type GetClientAggregateType<T extends ClientAggregateArgs> = {
        [P in keyof T & keyof AggregateClient]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateClient[P]>
      : GetScalarType<T[P], AggregateClient[P]>
  }




  export type ClientGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ClientWhereInput
    orderBy?: ClientOrderByWithAggregationInput | ClientOrderByWithAggregationInput[]
    by: ClientScalarFieldEnum[] | ClientScalarFieldEnum
    having?: ClientScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ClientCountAggregateInputType | true
    _avg?: ClientAvgAggregateInputType
    _sum?: ClientSumAggregateInputType
    _min?: ClientMinAggregateInputType
    _max?: ClientMaxAggregateInputType
  }

  export type ClientGroupByOutputType = {
    id: number
    firstName: string
    lastName: string
    email: string | null
    phone: string | null
    secondaryPhone: string | null
    address: string | null
    emergencyContactName: string | null
    emergencyContactPhone: string | null
    notes: string | null
    dob: Date | null
    gender: string | null
    driverLicenseState: string | null
    driverLicenseNumber: string | null
    driverLicenseExp: string | null
    clientType: string | null
    active: boolean
    createdAt: Date
    updatedAt: Date
    _count: ClientCountAggregateOutputType | null
    _avg: ClientAvgAggregateOutputType | null
    _sum: ClientSumAggregateOutputType | null
    _min: ClientMinAggregateOutputType | null
    _max: ClientMaxAggregateOutputType | null
  }

  type GetClientGroupByPayload<T extends ClientGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ClientGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ClientGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ClientGroupByOutputType[P]>
            : GetScalarType<T[P], ClientGroupByOutputType[P]>
        }
      >
    >


  export type ClientSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    firstName?: boolean
    lastName?: boolean
    email?: boolean
    phone?: boolean
    secondaryPhone?: boolean
    address?: boolean
    emergencyContactName?: boolean
    emergencyContactPhone?: boolean
    notes?: boolean
    dob?: boolean
    gender?: boolean
    driverLicenseState?: boolean
    driverLicenseNumber?: boolean
    driverLicenseExp?: boolean
    clientType?: boolean
    active?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    pets?: boolean | Client$petsArgs<ExtArgs>
    appointments?: boolean | Client$appointmentsArgs<ExtArgs>
    _count?: boolean | ClientCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["client"]>

  export type ClientSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    firstName?: boolean
    lastName?: boolean
    email?: boolean
    phone?: boolean
    secondaryPhone?: boolean
    address?: boolean
    emergencyContactName?: boolean
    emergencyContactPhone?: boolean
    notes?: boolean
    dob?: boolean
    gender?: boolean
    driverLicenseState?: boolean
    driverLicenseNumber?: boolean
    driverLicenseExp?: boolean
    clientType?: boolean
    active?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["client"]>

  export type ClientSelectScalar = {
    id?: boolean
    firstName?: boolean
    lastName?: boolean
    email?: boolean
    phone?: boolean
    secondaryPhone?: boolean
    address?: boolean
    emergencyContactName?: boolean
    emergencyContactPhone?: boolean
    notes?: boolean
    dob?: boolean
    gender?: boolean
    driverLicenseState?: boolean
    driverLicenseNumber?: boolean
    driverLicenseExp?: boolean
    clientType?: boolean
    active?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ClientInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    pets?: boolean | Client$petsArgs<ExtArgs>
    appointments?: boolean | Client$appointmentsArgs<ExtArgs>
    _count?: boolean | ClientCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ClientIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $ClientPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Client"
    objects: {
      pets: Prisma.$PatientPayload<ExtArgs>[]
      appointments: Prisma.$AppointmentPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      firstName: string
      lastName: string
      email: string | null
      phone: string | null
      secondaryPhone: string | null
      address: string | null
      emergencyContactName: string | null
      emergencyContactPhone: string | null
      notes: string | null
      dob: Date | null
      gender: string | null
      driverLicenseState: string | null
      driverLicenseNumber: string | null
      driverLicenseExp: string | null
      clientType: string | null
      active: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["client"]>
    composites: {}
  }

  type ClientGetPayload<S extends boolean | null | undefined | ClientDefaultArgs> = $Result.GetResult<Prisma.$ClientPayload, S>

  type ClientCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ClientFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ClientCountAggregateInputType | true
    }

  export interface ClientDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Client'], meta: { name: 'Client' } }
    /**
     * Find zero or one Client that matches the filter.
     * @param {ClientFindUniqueArgs} args - Arguments to find a Client
     * @example
     * // Get one Client
     * const client = await prisma.client.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ClientFindUniqueArgs>(args: SelectSubset<T, ClientFindUniqueArgs<ExtArgs>>): Prisma__ClientClient<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Client that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ClientFindUniqueOrThrowArgs} args - Arguments to find a Client
     * @example
     * // Get one Client
     * const client = await prisma.client.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ClientFindUniqueOrThrowArgs>(args: SelectSubset<T, ClientFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ClientClient<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Client that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClientFindFirstArgs} args - Arguments to find a Client
     * @example
     * // Get one Client
     * const client = await prisma.client.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ClientFindFirstArgs>(args?: SelectSubset<T, ClientFindFirstArgs<ExtArgs>>): Prisma__ClientClient<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Client that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClientFindFirstOrThrowArgs} args - Arguments to find a Client
     * @example
     * // Get one Client
     * const client = await prisma.client.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ClientFindFirstOrThrowArgs>(args?: SelectSubset<T, ClientFindFirstOrThrowArgs<ExtArgs>>): Prisma__ClientClient<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Clients that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClientFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Clients
     * const clients = await prisma.client.findMany()
     * 
     * // Get first 10 Clients
     * const clients = await prisma.client.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const clientWithIdOnly = await prisma.client.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ClientFindManyArgs>(args?: SelectSubset<T, ClientFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Client.
     * @param {ClientCreateArgs} args - Arguments to create a Client.
     * @example
     * // Create one Client
     * const Client = await prisma.client.create({
     *   data: {
     *     // ... data to create a Client
     *   }
     * })
     * 
     */
    create<T extends ClientCreateArgs>(args: SelectSubset<T, ClientCreateArgs<ExtArgs>>): Prisma__ClientClient<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Clients.
     * @param {ClientCreateManyArgs} args - Arguments to create many Clients.
     * @example
     * // Create many Clients
     * const client = await prisma.client.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ClientCreateManyArgs>(args?: SelectSubset<T, ClientCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Clients and returns the data saved in the database.
     * @param {ClientCreateManyAndReturnArgs} args - Arguments to create many Clients.
     * @example
     * // Create many Clients
     * const client = await prisma.client.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Clients and only return the `id`
     * const clientWithIdOnly = await prisma.client.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ClientCreateManyAndReturnArgs>(args?: SelectSubset<T, ClientCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Client.
     * @param {ClientDeleteArgs} args - Arguments to delete one Client.
     * @example
     * // Delete one Client
     * const Client = await prisma.client.delete({
     *   where: {
     *     // ... filter to delete one Client
     *   }
     * })
     * 
     */
    delete<T extends ClientDeleteArgs>(args: SelectSubset<T, ClientDeleteArgs<ExtArgs>>): Prisma__ClientClient<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Client.
     * @param {ClientUpdateArgs} args - Arguments to update one Client.
     * @example
     * // Update one Client
     * const client = await prisma.client.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ClientUpdateArgs>(args: SelectSubset<T, ClientUpdateArgs<ExtArgs>>): Prisma__ClientClient<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Clients.
     * @param {ClientDeleteManyArgs} args - Arguments to filter Clients to delete.
     * @example
     * // Delete a few Clients
     * const { count } = await prisma.client.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ClientDeleteManyArgs>(args?: SelectSubset<T, ClientDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Clients.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClientUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Clients
     * const client = await prisma.client.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ClientUpdateManyArgs>(args: SelectSubset<T, ClientUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Client.
     * @param {ClientUpsertArgs} args - Arguments to update or create a Client.
     * @example
     * // Update or create a Client
     * const client = await prisma.client.upsert({
     *   create: {
     *     // ... data to create a Client
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Client we want to update
     *   }
     * })
     */
    upsert<T extends ClientUpsertArgs>(args: SelectSubset<T, ClientUpsertArgs<ExtArgs>>): Prisma__ClientClient<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Clients.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClientCountArgs} args - Arguments to filter Clients to count.
     * @example
     * // Count the number of Clients
     * const count = await prisma.client.count({
     *   where: {
     *     // ... the filter for the Clients we want to count
     *   }
     * })
    **/
    count<T extends ClientCountArgs>(
      args?: Subset<T, ClientCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ClientCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Client.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClientAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ClientAggregateArgs>(args: Subset<T, ClientAggregateArgs>): Prisma.PrismaPromise<GetClientAggregateType<T>>

    /**
     * Group by Client.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClientGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ClientGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ClientGroupByArgs['orderBy'] }
        : { orderBy?: ClientGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ClientGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetClientGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Client model
   */
  readonly fields: ClientFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Client.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ClientClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    pets<T extends Client$petsArgs<ExtArgs> = {}>(args?: Subset<T, Client$petsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "findMany"> | Null>
    appointments<T extends Client$appointmentsArgs<ExtArgs> = {}>(args?: Subset<T, Client$appointmentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Client model
   */ 
  interface ClientFieldRefs {
    readonly id: FieldRef<"Client", 'Int'>
    readonly firstName: FieldRef<"Client", 'String'>
    readonly lastName: FieldRef<"Client", 'String'>
    readonly email: FieldRef<"Client", 'String'>
    readonly phone: FieldRef<"Client", 'String'>
    readonly secondaryPhone: FieldRef<"Client", 'String'>
    readonly address: FieldRef<"Client", 'String'>
    readonly emergencyContactName: FieldRef<"Client", 'String'>
    readonly emergencyContactPhone: FieldRef<"Client", 'String'>
    readonly notes: FieldRef<"Client", 'String'>
    readonly dob: FieldRef<"Client", 'DateTime'>
    readonly gender: FieldRef<"Client", 'String'>
    readonly driverLicenseState: FieldRef<"Client", 'String'>
    readonly driverLicenseNumber: FieldRef<"Client", 'String'>
    readonly driverLicenseExp: FieldRef<"Client", 'String'>
    readonly clientType: FieldRef<"Client", 'String'>
    readonly active: FieldRef<"Client", 'Boolean'>
    readonly createdAt: FieldRef<"Client", 'DateTime'>
    readonly updatedAt: FieldRef<"Client", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Client findUnique
   */
  export type ClientFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientInclude<ExtArgs> | null
    /**
     * Filter, which Client to fetch.
     */
    where: ClientWhereUniqueInput
  }

  /**
   * Client findUniqueOrThrow
   */
  export type ClientFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientInclude<ExtArgs> | null
    /**
     * Filter, which Client to fetch.
     */
    where: ClientWhereUniqueInput
  }

  /**
   * Client findFirst
   */
  export type ClientFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientInclude<ExtArgs> | null
    /**
     * Filter, which Client to fetch.
     */
    where?: ClientWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Clients to fetch.
     */
    orderBy?: ClientOrderByWithRelationInput | ClientOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Clients.
     */
    cursor?: ClientWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Clients from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Clients.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Clients.
     */
    distinct?: ClientScalarFieldEnum | ClientScalarFieldEnum[]
  }

  /**
   * Client findFirstOrThrow
   */
  export type ClientFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientInclude<ExtArgs> | null
    /**
     * Filter, which Client to fetch.
     */
    where?: ClientWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Clients to fetch.
     */
    orderBy?: ClientOrderByWithRelationInput | ClientOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Clients.
     */
    cursor?: ClientWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Clients from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Clients.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Clients.
     */
    distinct?: ClientScalarFieldEnum | ClientScalarFieldEnum[]
  }

  /**
   * Client findMany
   */
  export type ClientFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientInclude<ExtArgs> | null
    /**
     * Filter, which Clients to fetch.
     */
    where?: ClientWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Clients to fetch.
     */
    orderBy?: ClientOrderByWithRelationInput | ClientOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Clients.
     */
    cursor?: ClientWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Clients from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Clients.
     */
    skip?: number
    distinct?: ClientScalarFieldEnum | ClientScalarFieldEnum[]
  }

  /**
   * Client create
   */
  export type ClientCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientInclude<ExtArgs> | null
    /**
     * The data needed to create a Client.
     */
    data: XOR<ClientCreateInput, ClientUncheckedCreateInput>
  }

  /**
   * Client createMany
   */
  export type ClientCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Clients.
     */
    data: ClientCreateManyInput | ClientCreateManyInput[]
  }

  /**
   * Client createManyAndReturn
   */
  export type ClientCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Clients.
     */
    data: ClientCreateManyInput | ClientCreateManyInput[]
  }

  /**
   * Client update
   */
  export type ClientUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientInclude<ExtArgs> | null
    /**
     * The data needed to update a Client.
     */
    data: XOR<ClientUpdateInput, ClientUncheckedUpdateInput>
    /**
     * Choose, which Client to update.
     */
    where: ClientWhereUniqueInput
  }

  /**
   * Client updateMany
   */
  export type ClientUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Clients.
     */
    data: XOR<ClientUpdateManyMutationInput, ClientUncheckedUpdateManyInput>
    /**
     * Filter which Clients to update
     */
    where?: ClientWhereInput
  }

  /**
   * Client upsert
   */
  export type ClientUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientInclude<ExtArgs> | null
    /**
     * The filter to search for the Client to update in case it exists.
     */
    where: ClientWhereUniqueInput
    /**
     * In case the Client found by the `where` argument doesn't exist, create a new Client with this data.
     */
    create: XOR<ClientCreateInput, ClientUncheckedCreateInput>
    /**
     * In case the Client was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ClientUpdateInput, ClientUncheckedUpdateInput>
  }

  /**
   * Client delete
   */
  export type ClientDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientInclude<ExtArgs> | null
    /**
     * Filter which Client to delete.
     */
    where: ClientWhereUniqueInput
  }

  /**
   * Client deleteMany
   */
  export type ClientDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Clients to delete
     */
    where?: ClientWhereInput
  }

  /**
   * Client.pets
   */
  export type Client$petsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Patient
     */
    select?: PatientSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientInclude<ExtArgs> | null
    where?: PatientWhereInput
    orderBy?: PatientOrderByWithRelationInput | PatientOrderByWithRelationInput[]
    cursor?: PatientWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PatientScalarFieldEnum | PatientScalarFieldEnum[]
  }

  /**
   * Client.appointments
   */
  export type Client$appointmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
    where?: AppointmentWhereInput
    orderBy?: AppointmentOrderByWithRelationInput | AppointmentOrderByWithRelationInput[]
    cursor?: AppointmentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AppointmentScalarFieldEnum | AppointmentScalarFieldEnum[]
  }

  /**
   * Client without action
   */
  export type ClientDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientInclude<ExtArgs> | null
  }


  /**
   * Model Patient
   */

  export type AggregatePatient = {
    _count: PatientCountAggregateOutputType | null
    _avg: PatientAvgAggregateOutputType | null
    _sum: PatientSumAggregateOutputType | null
    _min: PatientMinAggregateOutputType | null
    _max: PatientMaxAggregateOutputType | null
  }

  export type PatientAvgAggregateOutputType = {
    id: number | null
    weight: number | null
    clientId: number | null
  }

  export type PatientSumAggregateOutputType = {
    id: number | null
    weight: number | null
    clientId: number | null
  }

  export type PatientMinAggregateOutputType = {
    id: number | null
    name: string | null
    species: string | null
    breed: string | null
    sex: string | null
    weight: number | null
    microchipNumber: string | null
    color: string | null
    birthDate: Date | null
    notes: string | null
    clientId: number | null
    photoUrl: string | null
    rabiesTag: string | null
    preferredProvider: string | null
    referralSource: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PatientMaxAggregateOutputType = {
    id: number | null
    name: string | null
    species: string | null
    breed: string | null
    sex: string | null
    weight: number | null
    microchipNumber: string | null
    color: string | null
    birthDate: Date | null
    notes: string | null
    clientId: number | null
    photoUrl: string | null
    rabiesTag: string | null
    preferredProvider: string | null
    referralSource: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PatientCountAggregateOutputType = {
    id: number
    name: number
    species: number
    breed: number
    sex: number
    weight: number
    microchipNumber: number
    color: number
    birthDate: number
    notes: number
    clientId: number
    photoUrl: number
    rabiesTag: number
    preferredProvider: number
    referralSource: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type PatientAvgAggregateInputType = {
    id?: true
    weight?: true
    clientId?: true
  }

  export type PatientSumAggregateInputType = {
    id?: true
    weight?: true
    clientId?: true
  }

  export type PatientMinAggregateInputType = {
    id?: true
    name?: true
    species?: true
    breed?: true
    sex?: true
    weight?: true
    microchipNumber?: true
    color?: true
    birthDate?: true
    notes?: true
    clientId?: true
    photoUrl?: true
    rabiesTag?: true
    preferredProvider?: true
    referralSource?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PatientMaxAggregateInputType = {
    id?: true
    name?: true
    species?: true
    breed?: true
    sex?: true
    weight?: true
    microchipNumber?: true
    color?: true
    birthDate?: true
    notes?: true
    clientId?: true
    photoUrl?: true
    rabiesTag?: true
    preferredProvider?: true
    referralSource?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PatientCountAggregateInputType = {
    id?: true
    name?: true
    species?: true
    breed?: true
    sex?: true
    weight?: true
    microchipNumber?: true
    color?: true
    birthDate?: true
    notes?: true
    clientId?: true
    photoUrl?: true
    rabiesTag?: true
    preferredProvider?: true
    referralSource?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type PatientAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Patient to aggregate.
     */
    where?: PatientWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Patients to fetch.
     */
    orderBy?: PatientOrderByWithRelationInput | PatientOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PatientWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Patients from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Patients.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Patients
    **/
    _count?: true | PatientCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PatientAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PatientSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PatientMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PatientMaxAggregateInputType
  }

  export type GetPatientAggregateType<T extends PatientAggregateArgs> = {
        [P in keyof T & keyof AggregatePatient]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePatient[P]>
      : GetScalarType<T[P], AggregatePatient[P]>
  }




  export type PatientGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PatientWhereInput
    orderBy?: PatientOrderByWithAggregationInput | PatientOrderByWithAggregationInput[]
    by: PatientScalarFieldEnum[] | PatientScalarFieldEnum
    having?: PatientScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PatientCountAggregateInputType | true
    _avg?: PatientAvgAggregateInputType
    _sum?: PatientSumAggregateInputType
    _min?: PatientMinAggregateInputType
    _max?: PatientMaxAggregateInputType
  }

  export type PatientGroupByOutputType = {
    id: number
    name: string
    species: string
    breed: string | null
    sex: string | null
    weight: number | null
    microchipNumber: string | null
    color: string | null
    birthDate: Date | null
    notes: string | null
    clientId: number
    photoUrl: string | null
    rabiesTag: string | null
    preferredProvider: string | null
    referralSource: string | null
    createdAt: Date
    updatedAt: Date
    _count: PatientCountAggregateOutputType | null
    _avg: PatientAvgAggregateOutputType | null
    _sum: PatientSumAggregateOutputType | null
    _min: PatientMinAggregateOutputType | null
    _max: PatientMaxAggregateOutputType | null
  }

  type GetPatientGroupByPayload<T extends PatientGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PatientGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PatientGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PatientGroupByOutputType[P]>
            : GetScalarType<T[P], PatientGroupByOutputType[P]>
        }
      >
    >


  export type PatientSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    species?: boolean
    breed?: boolean
    sex?: boolean
    weight?: boolean
    microchipNumber?: boolean
    color?: boolean
    birthDate?: boolean
    notes?: boolean
    clientId?: boolean
    photoUrl?: boolean
    rabiesTag?: boolean
    preferredProvider?: boolean
    referralSource?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    client?: boolean | ClientDefaultArgs<ExtArgs>
    visits?: boolean | Patient$visitsArgs<ExtArgs>
    appointments?: boolean | Patient$appointmentsArgs<ExtArgs>
    _count?: boolean | PatientCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["patient"]>

  export type PatientSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    species?: boolean
    breed?: boolean
    sex?: boolean
    weight?: boolean
    microchipNumber?: boolean
    color?: boolean
    birthDate?: boolean
    notes?: boolean
    clientId?: boolean
    photoUrl?: boolean
    rabiesTag?: boolean
    preferredProvider?: boolean
    referralSource?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    client?: boolean | ClientDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["patient"]>

  export type PatientSelectScalar = {
    id?: boolean
    name?: boolean
    species?: boolean
    breed?: boolean
    sex?: boolean
    weight?: boolean
    microchipNumber?: boolean
    color?: boolean
    birthDate?: boolean
    notes?: boolean
    clientId?: boolean
    photoUrl?: boolean
    rabiesTag?: boolean
    preferredProvider?: boolean
    referralSource?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type PatientInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    client?: boolean | ClientDefaultArgs<ExtArgs>
    visits?: boolean | Patient$visitsArgs<ExtArgs>
    appointments?: boolean | Patient$appointmentsArgs<ExtArgs>
    _count?: boolean | PatientCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type PatientIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    client?: boolean | ClientDefaultArgs<ExtArgs>
  }

  export type $PatientPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Patient"
    objects: {
      client: Prisma.$ClientPayload<ExtArgs>
      visits: Prisma.$VisitPayload<ExtArgs>[]
      appointments: Prisma.$AppointmentPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      species: string
      breed: string | null
      sex: string | null
      weight: number | null
      microchipNumber: string | null
      color: string | null
      birthDate: Date | null
      notes: string | null
      clientId: number
      photoUrl: string | null
      rabiesTag: string | null
      preferredProvider: string | null
      referralSource: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["patient"]>
    composites: {}
  }

  type PatientGetPayload<S extends boolean | null | undefined | PatientDefaultArgs> = $Result.GetResult<Prisma.$PatientPayload, S>

  type PatientCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<PatientFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: PatientCountAggregateInputType | true
    }

  export interface PatientDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Patient'], meta: { name: 'Patient' } }
    /**
     * Find zero or one Patient that matches the filter.
     * @param {PatientFindUniqueArgs} args - Arguments to find a Patient
     * @example
     * // Get one Patient
     * const patient = await prisma.patient.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PatientFindUniqueArgs>(args: SelectSubset<T, PatientFindUniqueArgs<ExtArgs>>): Prisma__PatientClient<$Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Patient that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {PatientFindUniqueOrThrowArgs} args - Arguments to find a Patient
     * @example
     * // Get one Patient
     * const patient = await prisma.patient.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PatientFindUniqueOrThrowArgs>(args: SelectSubset<T, PatientFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PatientClient<$Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Patient that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatientFindFirstArgs} args - Arguments to find a Patient
     * @example
     * // Get one Patient
     * const patient = await prisma.patient.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PatientFindFirstArgs>(args?: SelectSubset<T, PatientFindFirstArgs<ExtArgs>>): Prisma__PatientClient<$Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Patient that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatientFindFirstOrThrowArgs} args - Arguments to find a Patient
     * @example
     * // Get one Patient
     * const patient = await prisma.patient.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PatientFindFirstOrThrowArgs>(args?: SelectSubset<T, PatientFindFirstOrThrowArgs<ExtArgs>>): Prisma__PatientClient<$Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Patients that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatientFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Patients
     * const patients = await prisma.patient.findMany()
     * 
     * // Get first 10 Patients
     * const patients = await prisma.patient.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const patientWithIdOnly = await prisma.patient.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PatientFindManyArgs>(args?: SelectSubset<T, PatientFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Patient.
     * @param {PatientCreateArgs} args - Arguments to create a Patient.
     * @example
     * // Create one Patient
     * const Patient = await prisma.patient.create({
     *   data: {
     *     // ... data to create a Patient
     *   }
     * })
     * 
     */
    create<T extends PatientCreateArgs>(args: SelectSubset<T, PatientCreateArgs<ExtArgs>>): Prisma__PatientClient<$Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Patients.
     * @param {PatientCreateManyArgs} args - Arguments to create many Patients.
     * @example
     * // Create many Patients
     * const patient = await prisma.patient.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PatientCreateManyArgs>(args?: SelectSubset<T, PatientCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Patients and returns the data saved in the database.
     * @param {PatientCreateManyAndReturnArgs} args - Arguments to create many Patients.
     * @example
     * // Create many Patients
     * const patient = await prisma.patient.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Patients and only return the `id`
     * const patientWithIdOnly = await prisma.patient.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PatientCreateManyAndReturnArgs>(args?: SelectSubset<T, PatientCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Patient.
     * @param {PatientDeleteArgs} args - Arguments to delete one Patient.
     * @example
     * // Delete one Patient
     * const Patient = await prisma.patient.delete({
     *   where: {
     *     // ... filter to delete one Patient
     *   }
     * })
     * 
     */
    delete<T extends PatientDeleteArgs>(args: SelectSubset<T, PatientDeleteArgs<ExtArgs>>): Prisma__PatientClient<$Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Patient.
     * @param {PatientUpdateArgs} args - Arguments to update one Patient.
     * @example
     * // Update one Patient
     * const patient = await prisma.patient.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PatientUpdateArgs>(args: SelectSubset<T, PatientUpdateArgs<ExtArgs>>): Prisma__PatientClient<$Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Patients.
     * @param {PatientDeleteManyArgs} args - Arguments to filter Patients to delete.
     * @example
     * // Delete a few Patients
     * const { count } = await prisma.patient.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PatientDeleteManyArgs>(args?: SelectSubset<T, PatientDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Patients.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatientUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Patients
     * const patient = await prisma.patient.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PatientUpdateManyArgs>(args: SelectSubset<T, PatientUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Patient.
     * @param {PatientUpsertArgs} args - Arguments to update or create a Patient.
     * @example
     * // Update or create a Patient
     * const patient = await prisma.patient.upsert({
     *   create: {
     *     // ... data to create a Patient
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Patient we want to update
     *   }
     * })
     */
    upsert<T extends PatientUpsertArgs>(args: SelectSubset<T, PatientUpsertArgs<ExtArgs>>): Prisma__PatientClient<$Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Patients.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatientCountArgs} args - Arguments to filter Patients to count.
     * @example
     * // Count the number of Patients
     * const count = await prisma.patient.count({
     *   where: {
     *     // ... the filter for the Patients we want to count
     *   }
     * })
    **/
    count<T extends PatientCountArgs>(
      args?: Subset<T, PatientCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PatientCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Patient.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatientAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PatientAggregateArgs>(args: Subset<T, PatientAggregateArgs>): Prisma.PrismaPromise<GetPatientAggregateType<T>>

    /**
     * Group by Patient.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatientGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PatientGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PatientGroupByArgs['orderBy'] }
        : { orderBy?: PatientGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PatientGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPatientGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Patient model
   */
  readonly fields: PatientFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Patient.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PatientClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    client<T extends ClientDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ClientDefaultArgs<ExtArgs>>): Prisma__ClientClient<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    visits<T extends Patient$visitsArgs<ExtArgs> = {}>(args?: Subset<T, Patient$visitsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VisitPayload<ExtArgs>, T, "findMany"> | Null>
    appointments<T extends Patient$appointmentsArgs<ExtArgs> = {}>(args?: Subset<T, Patient$appointmentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Patient model
   */ 
  interface PatientFieldRefs {
    readonly id: FieldRef<"Patient", 'Int'>
    readonly name: FieldRef<"Patient", 'String'>
    readonly species: FieldRef<"Patient", 'String'>
    readonly breed: FieldRef<"Patient", 'String'>
    readonly sex: FieldRef<"Patient", 'String'>
    readonly weight: FieldRef<"Patient", 'Float'>
    readonly microchipNumber: FieldRef<"Patient", 'String'>
    readonly color: FieldRef<"Patient", 'String'>
    readonly birthDate: FieldRef<"Patient", 'DateTime'>
    readonly notes: FieldRef<"Patient", 'String'>
    readonly clientId: FieldRef<"Patient", 'Int'>
    readonly photoUrl: FieldRef<"Patient", 'String'>
    readonly rabiesTag: FieldRef<"Patient", 'String'>
    readonly preferredProvider: FieldRef<"Patient", 'String'>
    readonly referralSource: FieldRef<"Patient", 'String'>
    readonly createdAt: FieldRef<"Patient", 'DateTime'>
    readonly updatedAt: FieldRef<"Patient", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Patient findUnique
   */
  export type PatientFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Patient
     */
    select?: PatientSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientInclude<ExtArgs> | null
    /**
     * Filter, which Patient to fetch.
     */
    where: PatientWhereUniqueInput
  }

  /**
   * Patient findUniqueOrThrow
   */
  export type PatientFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Patient
     */
    select?: PatientSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientInclude<ExtArgs> | null
    /**
     * Filter, which Patient to fetch.
     */
    where: PatientWhereUniqueInput
  }

  /**
   * Patient findFirst
   */
  export type PatientFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Patient
     */
    select?: PatientSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientInclude<ExtArgs> | null
    /**
     * Filter, which Patient to fetch.
     */
    where?: PatientWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Patients to fetch.
     */
    orderBy?: PatientOrderByWithRelationInput | PatientOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Patients.
     */
    cursor?: PatientWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Patients from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Patients.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Patients.
     */
    distinct?: PatientScalarFieldEnum | PatientScalarFieldEnum[]
  }

  /**
   * Patient findFirstOrThrow
   */
  export type PatientFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Patient
     */
    select?: PatientSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientInclude<ExtArgs> | null
    /**
     * Filter, which Patient to fetch.
     */
    where?: PatientWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Patients to fetch.
     */
    orderBy?: PatientOrderByWithRelationInput | PatientOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Patients.
     */
    cursor?: PatientWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Patients from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Patients.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Patients.
     */
    distinct?: PatientScalarFieldEnum | PatientScalarFieldEnum[]
  }

  /**
   * Patient findMany
   */
  export type PatientFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Patient
     */
    select?: PatientSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientInclude<ExtArgs> | null
    /**
     * Filter, which Patients to fetch.
     */
    where?: PatientWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Patients to fetch.
     */
    orderBy?: PatientOrderByWithRelationInput | PatientOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Patients.
     */
    cursor?: PatientWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Patients from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Patients.
     */
    skip?: number
    distinct?: PatientScalarFieldEnum | PatientScalarFieldEnum[]
  }

  /**
   * Patient create
   */
  export type PatientCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Patient
     */
    select?: PatientSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientInclude<ExtArgs> | null
    /**
     * The data needed to create a Patient.
     */
    data: XOR<PatientCreateInput, PatientUncheckedCreateInput>
  }

  /**
   * Patient createMany
   */
  export type PatientCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Patients.
     */
    data: PatientCreateManyInput | PatientCreateManyInput[]
  }

  /**
   * Patient createManyAndReturn
   */
  export type PatientCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Patient
     */
    select?: PatientSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Patients.
     */
    data: PatientCreateManyInput | PatientCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Patient update
   */
  export type PatientUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Patient
     */
    select?: PatientSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientInclude<ExtArgs> | null
    /**
     * The data needed to update a Patient.
     */
    data: XOR<PatientUpdateInput, PatientUncheckedUpdateInput>
    /**
     * Choose, which Patient to update.
     */
    where: PatientWhereUniqueInput
  }

  /**
   * Patient updateMany
   */
  export type PatientUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Patients.
     */
    data: XOR<PatientUpdateManyMutationInput, PatientUncheckedUpdateManyInput>
    /**
     * Filter which Patients to update
     */
    where?: PatientWhereInput
  }

  /**
   * Patient upsert
   */
  export type PatientUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Patient
     */
    select?: PatientSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientInclude<ExtArgs> | null
    /**
     * The filter to search for the Patient to update in case it exists.
     */
    where: PatientWhereUniqueInput
    /**
     * In case the Patient found by the `where` argument doesn't exist, create a new Patient with this data.
     */
    create: XOR<PatientCreateInput, PatientUncheckedCreateInput>
    /**
     * In case the Patient was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PatientUpdateInput, PatientUncheckedUpdateInput>
  }

  /**
   * Patient delete
   */
  export type PatientDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Patient
     */
    select?: PatientSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientInclude<ExtArgs> | null
    /**
     * Filter which Patient to delete.
     */
    where: PatientWhereUniqueInput
  }

  /**
   * Patient deleteMany
   */
  export type PatientDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Patients to delete
     */
    where?: PatientWhereInput
  }

  /**
   * Patient.visits
   */
  export type Patient$visitsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Visit
     */
    select?: VisitSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VisitInclude<ExtArgs> | null
    where?: VisitWhereInput
    orderBy?: VisitOrderByWithRelationInput | VisitOrderByWithRelationInput[]
    cursor?: VisitWhereUniqueInput
    take?: number
    skip?: number
    distinct?: VisitScalarFieldEnum | VisitScalarFieldEnum[]
  }

  /**
   * Patient.appointments
   */
  export type Patient$appointmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
    where?: AppointmentWhereInput
    orderBy?: AppointmentOrderByWithRelationInput | AppointmentOrderByWithRelationInput[]
    cursor?: AppointmentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AppointmentScalarFieldEnum | AppointmentScalarFieldEnum[]
  }

  /**
   * Patient without action
   */
  export type PatientDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Patient
     */
    select?: PatientSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientInclude<ExtArgs> | null
  }


  /**
   * Model Vet
   */

  export type AggregateVet = {
    _count: VetCountAggregateOutputType | null
    _avg: VetAvgAggregateOutputType | null
    _sum: VetSumAggregateOutputType | null
    _min: VetMinAggregateOutputType | null
    _max: VetMaxAggregateOutputType | null
  }

  export type VetAvgAggregateOutputType = {
    id: number | null
  }

  export type VetSumAggregateOutputType = {
    id: number | null
  }

  export type VetMinAggregateOutputType = {
    id: number | null
    name: string | null
    email: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type VetMaxAggregateOutputType = {
    id: number | null
    name: string | null
    email: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type VetCountAggregateOutputType = {
    id: number
    name: number
    email: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type VetAvgAggregateInputType = {
    id?: true
  }

  export type VetSumAggregateInputType = {
    id?: true
  }

  export type VetMinAggregateInputType = {
    id?: true
    name?: true
    email?: true
    createdAt?: true
    updatedAt?: true
  }

  export type VetMaxAggregateInputType = {
    id?: true
    name?: true
    email?: true
    createdAt?: true
    updatedAt?: true
  }

  export type VetCountAggregateInputType = {
    id?: true
    name?: true
    email?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type VetAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Vet to aggregate.
     */
    where?: VetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Vets to fetch.
     */
    orderBy?: VetOrderByWithRelationInput | VetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: VetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Vets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Vets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Vets
    **/
    _count?: true | VetCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: VetAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: VetSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: VetMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: VetMaxAggregateInputType
  }

  export type GetVetAggregateType<T extends VetAggregateArgs> = {
        [P in keyof T & keyof AggregateVet]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateVet[P]>
      : GetScalarType<T[P], AggregateVet[P]>
  }




  export type VetGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VetWhereInput
    orderBy?: VetOrderByWithAggregationInput | VetOrderByWithAggregationInput[]
    by: VetScalarFieldEnum[] | VetScalarFieldEnum
    having?: VetScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: VetCountAggregateInputType | true
    _avg?: VetAvgAggregateInputType
    _sum?: VetSumAggregateInputType
    _min?: VetMinAggregateInputType
    _max?: VetMaxAggregateInputType
  }

  export type VetGroupByOutputType = {
    id: number
    name: string
    email: string
    createdAt: Date
    updatedAt: Date
    _count: VetCountAggregateOutputType | null
    _avg: VetAvgAggregateOutputType | null
    _sum: VetSumAggregateOutputType | null
    _min: VetMinAggregateOutputType | null
    _max: VetMaxAggregateOutputType | null
  }

  type GetVetGroupByPayload<T extends VetGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<VetGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof VetGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], VetGroupByOutputType[P]>
            : GetScalarType<T[P], VetGroupByOutputType[P]>
        }
      >
    >


  export type VetSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    visits?: boolean | Vet$visitsArgs<ExtArgs>
    _count?: boolean | VetCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["vet"]>

  export type VetSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["vet"]>

  export type VetSelectScalar = {
    id?: boolean
    name?: boolean
    email?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type VetInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    visits?: boolean | Vet$visitsArgs<ExtArgs>
    _count?: boolean | VetCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type VetIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $VetPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Vet"
    objects: {
      visits: Prisma.$VisitPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      email: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["vet"]>
    composites: {}
  }

  type VetGetPayload<S extends boolean | null | undefined | VetDefaultArgs> = $Result.GetResult<Prisma.$VetPayload, S>

  type VetCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<VetFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: VetCountAggregateInputType | true
    }

  export interface VetDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Vet'], meta: { name: 'Vet' } }
    /**
     * Find zero or one Vet that matches the filter.
     * @param {VetFindUniqueArgs} args - Arguments to find a Vet
     * @example
     * // Get one Vet
     * const vet = await prisma.vet.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends VetFindUniqueArgs>(args: SelectSubset<T, VetFindUniqueArgs<ExtArgs>>): Prisma__VetClient<$Result.GetResult<Prisma.$VetPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Vet that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {VetFindUniqueOrThrowArgs} args - Arguments to find a Vet
     * @example
     * // Get one Vet
     * const vet = await prisma.vet.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends VetFindUniqueOrThrowArgs>(args: SelectSubset<T, VetFindUniqueOrThrowArgs<ExtArgs>>): Prisma__VetClient<$Result.GetResult<Prisma.$VetPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Vet that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VetFindFirstArgs} args - Arguments to find a Vet
     * @example
     * // Get one Vet
     * const vet = await prisma.vet.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends VetFindFirstArgs>(args?: SelectSubset<T, VetFindFirstArgs<ExtArgs>>): Prisma__VetClient<$Result.GetResult<Prisma.$VetPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Vet that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VetFindFirstOrThrowArgs} args - Arguments to find a Vet
     * @example
     * // Get one Vet
     * const vet = await prisma.vet.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends VetFindFirstOrThrowArgs>(args?: SelectSubset<T, VetFindFirstOrThrowArgs<ExtArgs>>): Prisma__VetClient<$Result.GetResult<Prisma.$VetPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Vets that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VetFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Vets
     * const vets = await prisma.vet.findMany()
     * 
     * // Get first 10 Vets
     * const vets = await prisma.vet.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const vetWithIdOnly = await prisma.vet.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends VetFindManyArgs>(args?: SelectSubset<T, VetFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VetPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Vet.
     * @param {VetCreateArgs} args - Arguments to create a Vet.
     * @example
     * // Create one Vet
     * const Vet = await prisma.vet.create({
     *   data: {
     *     // ... data to create a Vet
     *   }
     * })
     * 
     */
    create<T extends VetCreateArgs>(args: SelectSubset<T, VetCreateArgs<ExtArgs>>): Prisma__VetClient<$Result.GetResult<Prisma.$VetPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Vets.
     * @param {VetCreateManyArgs} args - Arguments to create many Vets.
     * @example
     * // Create many Vets
     * const vet = await prisma.vet.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends VetCreateManyArgs>(args?: SelectSubset<T, VetCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Vets and returns the data saved in the database.
     * @param {VetCreateManyAndReturnArgs} args - Arguments to create many Vets.
     * @example
     * // Create many Vets
     * const vet = await prisma.vet.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Vets and only return the `id`
     * const vetWithIdOnly = await prisma.vet.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends VetCreateManyAndReturnArgs>(args?: SelectSubset<T, VetCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VetPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Vet.
     * @param {VetDeleteArgs} args - Arguments to delete one Vet.
     * @example
     * // Delete one Vet
     * const Vet = await prisma.vet.delete({
     *   where: {
     *     // ... filter to delete one Vet
     *   }
     * })
     * 
     */
    delete<T extends VetDeleteArgs>(args: SelectSubset<T, VetDeleteArgs<ExtArgs>>): Prisma__VetClient<$Result.GetResult<Prisma.$VetPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Vet.
     * @param {VetUpdateArgs} args - Arguments to update one Vet.
     * @example
     * // Update one Vet
     * const vet = await prisma.vet.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends VetUpdateArgs>(args: SelectSubset<T, VetUpdateArgs<ExtArgs>>): Prisma__VetClient<$Result.GetResult<Prisma.$VetPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Vets.
     * @param {VetDeleteManyArgs} args - Arguments to filter Vets to delete.
     * @example
     * // Delete a few Vets
     * const { count } = await prisma.vet.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends VetDeleteManyArgs>(args?: SelectSubset<T, VetDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Vets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VetUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Vets
     * const vet = await prisma.vet.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends VetUpdateManyArgs>(args: SelectSubset<T, VetUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Vet.
     * @param {VetUpsertArgs} args - Arguments to update or create a Vet.
     * @example
     * // Update or create a Vet
     * const vet = await prisma.vet.upsert({
     *   create: {
     *     // ... data to create a Vet
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Vet we want to update
     *   }
     * })
     */
    upsert<T extends VetUpsertArgs>(args: SelectSubset<T, VetUpsertArgs<ExtArgs>>): Prisma__VetClient<$Result.GetResult<Prisma.$VetPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Vets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VetCountArgs} args - Arguments to filter Vets to count.
     * @example
     * // Count the number of Vets
     * const count = await prisma.vet.count({
     *   where: {
     *     // ... the filter for the Vets we want to count
     *   }
     * })
    **/
    count<T extends VetCountArgs>(
      args?: Subset<T, VetCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], VetCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Vet.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VetAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends VetAggregateArgs>(args: Subset<T, VetAggregateArgs>): Prisma.PrismaPromise<GetVetAggregateType<T>>

    /**
     * Group by Vet.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VetGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends VetGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: VetGroupByArgs['orderBy'] }
        : { orderBy?: VetGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, VetGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetVetGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Vet model
   */
  readonly fields: VetFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Vet.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__VetClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    visits<T extends Vet$visitsArgs<ExtArgs> = {}>(args?: Subset<T, Vet$visitsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VisitPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Vet model
   */ 
  interface VetFieldRefs {
    readonly id: FieldRef<"Vet", 'Int'>
    readonly name: FieldRef<"Vet", 'String'>
    readonly email: FieldRef<"Vet", 'String'>
    readonly createdAt: FieldRef<"Vet", 'DateTime'>
    readonly updatedAt: FieldRef<"Vet", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Vet findUnique
   */
  export type VetFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vet
     */
    select?: VetSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VetInclude<ExtArgs> | null
    /**
     * Filter, which Vet to fetch.
     */
    where: VetWhereUniqueInput
  }

  /**
   * Vet findUniqueOrThrow
   */
  export type VetFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vet
     */
    select?: VetSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VetInclude<ExtArgs> | null
    /**
     * Filter, which Vet to fetch.
     */
    where: VetWhereUniqueInput
  }

  /**
   * Vet findFirst
   */
  export type VetFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vet
     */
    select?: VetSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VetInclude<ExtArgs> | null
    /**
     * Filter, which Vet to fetch.
     */
    where?: VetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Vets to fetch.
     */
    orderBy?: VetOrderByWithRelationInput | VetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Vets.
     */
    cursor?: VetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Vets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Vets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Vets.
     */
    distinct?: VetScalarFieldEnum | VetScalarFieldEnum[]
  }

  /**
   * Vet findFirstOrThrow
   */
  export type VetFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vet
     */
    select?: VetSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VetInclude<ExtArgs> | null
    /**
     * Filter, which Vet to fetch.
     */
    where?: VetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Vets to fetch.
     */
    orderBy?: VetOrderByWithRelationInput | VetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Vets.
     */
    cursor?: VetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Vets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Vets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Vets.
     */
    distinct?: VetScalarFieldEnum | VetScalarFieldEnum[]
  }

  /**
   * Vet findMany
   */
  export type VetFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vet
     */
    select?: VetSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VetInclude<ExtArgs> | null
    /**
     * Filter, which Vets to fetch.
     */
    where?: VetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Vets to fetch.
     */
    orderBy?: VetOrderByWithRelationInput | VetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Vets.
     */
    cursor?: VetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Vets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Vets.
     */
    skip?: number
    distinct?: VetScalarFieldEnum | VetScalarFieldEnum[]
  }

  /**
   * Vet create
   */
  export type VetCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vet
     */
    select?: VetSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VetInclude<ExtArgs> | null
    /**
     * The data needed to create a Vet.
     */
    data: XOR<VetCreateInput, VetUncheckedCreateInput>
  }

  /**
   * Vet createMany
   */
  export type VetCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Vets.
     */
    data: VetCreateManyInput | VetCreateManyInput[]
  }

  /**
   * Vet createManyAndReturn
   */
  export type VetCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vet
     */
    select?: VetSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Vets.
     */
    data: VetCreateManyInput | VetCreateManyInput[]
  }

  /**
   * Vet update
   */
  export type VetUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vet
     */
    select?: VetSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VetInclude<ExtArgs> | null
    /**
     * The data needed to update a Vet.
     */
    data: XOR<VetUpdateInput, VetUncheckedUpdateInput>
    /**
     * Choose, which Vet to update.
     */
    where: VetWhereUniqueInput
  }

  /**
   * Vet updateMany
   */
  export type VetUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Vets.
     */
    data: XOR<VetUpdateManyMutationInput, VetUncheckedUpdateManyInput>
    /**
     * Filter which Vets to update
     */
    where?: VetWhereInput
  }

  /**
   * Vet upsert
   */
  export type VetUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vet
     */
    select?: VetSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VetInclude<ExtArgs> | null
    /**
     * The filter to search for the Vet to update in case it exists.
     */
    where: VetWhereUniqueInput
    /**
     * In case the Vet found by the `where` argument doesn't exist, create a new Vet with this data.
     */
    create: XOR<VetCreateInput, VetUncheckedCreateInput>
    /**
     * In case the Vet was found with the provided `where` argument, update it with this data.
     */
    update: XOR<VetUpdateInput, VetUncheckedUpdateInput>
  }

  /**
   * Vet delete
   */
  export type VetDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vet
     */
    select?: VetSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VetInclude<ExtArgs> | null
    /**
     * Filter which Vet to delete.
     */
    where: VetWhereUniqueInput
  }

  /**
   * Vet deleteMany
   */
  export type VetDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Vets to delete
     */
    where?: VetWhereInput
  }

  /**
   * Vet.visits
   */
  export type Vet$visitsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Visit
     */
    select?: VisitSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VisitInclude<ExtArgs> | null
    where?: VisitWhereInput
    orderBy?: VisitOrderByWithRelationInput | VisitOrderByWithRelationInput[]
    cursor?: VisitWhereUniqueInput
    take?: number
    skip?: number
    distinct?: VisitScalarFieldEnum | VisitScalarFieldEnum[]
  }

  /**
   * Vet without action
   */
  export type VetDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vet
     */
    select?: VetSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VetInclude<ExtArgs> | null
  }


  /**
   * Model Visit
   */

  export type AggregateVisit = {
    _count: VisitCountAggregateOutputType | null
    _avg: VisitAvgAggregateOutputType | null
    _sum: VisitSumAggregateOutputType | null
    _min: VisitMinAggregateOutputType | null
    _max: VisitMaxAggregateOutputType | null
  }

  export type VisitAvgAggregateOutputType = {
    id: number | null
    patientId: number | null
    vetId: number | null
  }

  export type VisitSumAggregateOutputType = {
    id: number | null
    patientId: number | null
    vetId: number | null
  }

  export type VisitMinAggregateOutputType = {
    id: number | null
    date: Date | null
    notes: string | null
    patientId: number | null
    vetId: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type VisitMaxAggregateOutputType = {
    id: number | null
    date: Date | null
    notes: string | null
    patientId: number | null
    vetId: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type VisitCountAggregateOutputType = {
    id: number
    date: number
    notes: number
    patientId: number
    vetId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type VisitAvgAggregateInputType = {
    id?: true
    patientId?: true
    vetId?: true
  }

  export type VisitSumAggregateInputType = {
    id?: true
    patientId?: true
    vetId?: true
  }

  export type VisitMinAggregateInputType = {
    id?: true
    date?: true
    notes?: true
    patientId?: true
    vetId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type VisitMaxAggregateInputType = {
    id?: true
    date?: true
    notes?: true
    patientId?: true
    vetId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type VisitCountAggregateInputType = {
    id?: true
    date?: true
    notes?: true
    patientId?: true
    vetId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type VisitAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Visit to aggregate.
     */
    where?: VisitWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Visits to fetch.
     */
    orderBy?: VisitOrderByWithRelationInput | VisitOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: VisitWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Visits from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Visits.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Visits
    **/
    _count?: true | VisitCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: VisitAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: VisitSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: VisitMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: VisitMaxAggregateInputType
  }

  export type GetVisitAggregateType<T extends VisitAggregateArgs> = {
        [P in keyof T & keyof AggregateVisit]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateVisit[P]>
      : GetScalarType<T[P], AggregateVisit[P]>
  }




  export type VisitGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VisitWhereInput
    orderBy?: VisitOrderByWithAggregationInput | VisitOrderByWithAggregationInput[]
    by: VisitScalarFieldEnum[] | VisitScalarFieldEnum
    having?: VisitScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: VisitCountAggregateInputType | true
    _avg?: VisitAvgAggregateInputType
    _sum?: VisitSumAggregateInputType
    _min?: VisitMinAggregateInputType
    _max?: VisitMaxAggregateInputType
  }

  export type VisitGroupByOutputType = {
    id: number
    date: Date
    notes: string
    patientId: number
    vetId: number
    createdAt: Date
    updatedAt: Date
    _count: VisitCountAggregateOutputType | null
    _avg: VisitAvgAggregateOutputType | null
    _sum: VisitSumAggregateOutputType | null
    _min: VisitMinAggregateOutputType | null
    _max: VisitMaxAggregateOutputType | null
  }

  type GetVisitGroupByPayload<T extends VisitGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<VisitGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof VisitGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], VisitGroupByOutputType[P]>
            : GetScalarType<T[P], VisitGroupByOutputType[P]>
        }
      >
    >


  export type VisitSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    date?: boolean
    notes?: boolean
    patientId?: boolean
    vetId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    patient?: boolean | PatientDefaultArgs<ExtArgs>
    vet?: boolean | VetDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["visit"]>

  export type VisitSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    date?: boolean
    notes?: boolean
    patientId?: boolean
    vetId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    patient?: boolean | PatientDefaultArgs<ExtArgs>
    vet?: boolean | VetDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["visit"]>

  export type VisitSelectScalar = {
    id?: boolean
    date?: boolean
    notes?: boolean
    patientId?: boolean
    vetId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type VisitInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    patient?: boolean | PatientDefaultArgs<ExtArgs>
    vet?: boolean | VetDefaultArgs<ExtArgs>
  }
  export type VisitIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    patient?: boolean | PatientDefaultArgs<ExtArgs>
    vet?: boolean | VetDefaultArgs<ExtArgs>
  }

  export type $VisitPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Visit"
    objects: {
      patient: Prisma.$PatientPayload<ExtArgs>
      vet: Prisma.$VetPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      date: Date
      notes: string
      patientId: number
      vetId: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["visit"]>
    composites: {}
  }

  type VisitGetPayload<S extends boolean | null | undefined | VisitDefaultArgs> = $Result.GetResult<Prisma.$VisitPayload, S>

  type VisitCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<VisitFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: VisitCountAggregateInputType | true
    }

  export interface VisitDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Visit'], meta: { name: 'Visit' } }
    /**
     * Find zero or one Visit that matches the filter.
     * @param {VisitFindUniqueArgs} args - Arguments to find a Visit
     * @example
     * // Get one Visit
     * const visit = await prisma.visit.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends VisitFindUniqueArgs>(args: SelectSubset<T, VisitFindUniqueArgs<ExtArgs>>): Prisma__VisitClient<$Result.GetResult<Prisma.$VisitPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Visit that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {VisitFindUniqueOrThrowArgs} args - Arguments to find a Visit
     * @example
     * // Get one Visit
     * const visit = await prisma.visit.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends VisitFindUniqueOrThrowArgs>(args: SelectSubset<T, VisitFindUniqueOrThrowArgs<ExtArgs>>): Prisma__VisitClient<$Result.GetResult<Prisma.$VisitPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Visit that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VisitFindFirstArgs} args - Arguments to find a Visit
     * @example
     * // Get one Visit
     * const visit = await prisma.visit.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends VisitFindFirstArgs>(args?: SelectSubset<T, VisitFindFirstArgs<ExtArgs>>): Prisma__VisitClient<$Result.GetResult<Prisma.$VisitPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Visit that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VisitFindFirstOrThrowArgs} args - Arguments to find a Visit
     * @example
     * // Get one Visit
     * const visit = await prisma.visit.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends VisitFindFirstOrThrowArgs>(args?: SelectSubset<T, VisitFindFirstOrThrowArgs<ExtArgs>>): Prisma__VisitClient<$Result.GetResult<Prisma.$VisitPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Visits that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VisitFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Visits
     * const visits = await prisma.visit.findMany()
     * 
     * // Get first 10 Visits
     * const visits = await prisma.visit.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const visitWithIdOnly = await prisma.visit.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends VisitFindManyArgs>(args?: SelectSubset<T, VisitFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VisitPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Visit.
     * @param {VisitCreateArgs} args - Arguments to create a Visit.
     * @example
     * // Create one Visit
     * const Visit = await prisma.visit.create({
     *   data: {
     *     // ... data to create a Visit
     *   }
     * })
     * 
     */
    create<T extends VisitCreateArgs>(args: SelectSubset<T, VisitCreateArgs<ExtArgs>>): Prisma__VisitClient<$Result.GetResult<Prisma.$VisitPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Visits.
     * @param {VisitCreateManyArgs} args - Arguments to create many Visits.
     * @example
     * // Create many Visits
     * const visit = await prisma.visit.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends VisitCreateManyArgs>(args?: SelectSubset<T, VisitCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Visits and returns the data saved in the database.
     * @param {VisitCreateManyAndReturnArgs} args - Arguments to create many Visits.
     * @example
     * // Create many Visits
     * const visit = await prisma.visit.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Visits and only return the `id`
     * const visitWithIdOnly = await prisma.visit.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends VisitCreateManyAndReturnArgs>(args?: SelectSubset<T, VisitCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VisitPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Visit.
     * @param {VisitDeleteArgs} args - Arguments to delete one Visit.
     * @example
     * // Delete one Visit
     * const Visit = await prisma.visit.delete({
     *   where: {
     *     // ... filter to delete one Visit
     *   }
     * })
     * 
     */
    delete<T extends VisitDeleteArgs>(args: SelectSubset<T, VisitDeleteArgs<ExtArgs>>): Prisma__VisitClient<$Result.GetResult<Prisma.$VisitPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Visit.
     * @param {VisitUpdateArgs} args - Arguments to update one Visit.
     * @example
     * // Update one Visit
     * const visit = await prisma.visit.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends VisitUpdateArgs>(args: SelectSubset<T, VisitUpdateArgs<ExtArgs>>): Prisma__VisitClient<$Result.GetResult<Prisma.$VisitPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Visits.
     * @param {VisitDeleteManyArgs} args - Arguments to filter Visits to delete.
     * @example
     * // Delete a few Visits
     * const { count } = await prisma.visit.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends VisitDeleteManyArgs>(args?: SelectSubset<T, VisitDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Visits.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VisitUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Visits
     * const visit = await prisma.visit.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends VisitUpdateManyArgs>(args: SelectSubset<T, VisitUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Visit.
     * @param {VisitUpsertArgs} args - Arguments to update or create a Visit.
     * @example
     * // Update or create a Visit
     * const visit = await prisma.visit.upsert({
     *   create: {
     *     // ... data to create a Visit
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Visit we want to update
     *   }
     * })
     */
    upsert<T extends VisitUpsertArgs>(args: SelectSubset<T, VisitUpsertArgs<ExtArgs>>): Prisma__VisitClient<$Result.GetResult<Prisma.$VisitPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Visits.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VisitCountArgs} args - Arguments to filter Visits to count.
     * @example
     * // Count the number of Visits
     * const count = await prisma.visit.count({
     *   where: {
     *     // ... the filter for the Visits we want to count
     *   }
     * })
    **/
    count<T extends VisitCountArgs>(
      args?: Subset<T, VisitCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], VisitCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Visit.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VisitAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends VisitAggregateArgs>(args: Subset<T, VisitAggregateArgs>): Prisma.PrismaPromise<GetVisitAggregateType<T>>

    /**
     * Group by Visit.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VisitGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends VisitGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: VisitGroupByArgs['orderBy'] }
        : { orderBy?: VisitGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, VisitGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetVisitGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Visit model
   */
  readonly fields: VisitFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Visit.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__VisitClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    patient<T extends PatientDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PatientDefaultArgs<ExtArgs>>): Prisma__PatientClient<$Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    vet<T extends VetDefaultArgs<ExtArgs> = {}>(args?: Subset<T, VetDefaultArgs<ExtArgs>>): Prisma__VetClient<$Result.GetResult<Prisma.$VetPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Visit model
   */ 
  interface VisitFieldRefs {
    readonly id: FieldRef<"Visit", 'Int'>
    readonly date: FieldRef<"Visit", 'DateTime'>
    readonly notes: FieldRef<"Visit", 'String'>
    readonly patientId: FieldRef<"Visit", 'Int'>
    readonly vetId: FieldRef<"Visit", 'Int'>
    readonly createdAt: FieldRef<"Visit", 'DateTime'>
    readonly updatedAt: FieldRef<"Visit", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Visit findUnique
   */
  export type VisitFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Visit
     */
    select?: VisitSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VisitInclude<ExtArgs> | null
    /**
     * Filter, which Visit to fetch.
     */
    where: VisitWhereUniqueInput
  }

  /**
   * Visit findUniqueOrThrow
   */
  export type VisitFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Visit
     */
    select?: VisitSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VisitInclude<ExtArgs> | null
    /**
     * Filter, which Visit to fetch.
     */
    where: VisitWhereUniqueInput
  }

  /**
   * Visit findFirst
   */
  export type VisitFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Visit
     */
    select?: VisitSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VisitInclude<ExtArgs> | null
    /**
     * Filter, which Visit to fetch.
     */
    where?: VisitWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Visits to fetch.
     */
    orderBy?: VisitOrderByWithRelationInput | VisitOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Visits.
     */
    cursor?: VisitWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Visits from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Visits.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Visits.
     */
    distinct?: VisitScalarFieldEnum | VisitScalarFieldEnum[]
  }

  /**
   * Visit findFirstOrThrow
   */
  export type VisitFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Visit
     */
    select?: VisitSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VisitInclude<ExtArgs> | null
    /**
     * Filter, which Visit to fetch.
     */
    where?: VisitWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Visits to fetch.
     */
    orderBy?: VisitOrderByWithRelationInput | VisitOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Visits.
     */
    cursor?: VisitWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Visits from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Visits.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Visits.
     */
    distinct?: VisitScalarFieldEnum | VisitScalarFieldEnum[]
  }

  /**
   * Visit findMany
   */
  export type VisitFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Visit
     */
    select?: VisitSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VisitInclude<ExtArgs> | null
    /**
     * Filter, which Visits to fetch.
     */
    where?: VisitWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Visits to fetch.
     */
    orderBy?: VisitOrderByWithRelationInput | VisitOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Visits.
     */
    cursor?: VisitWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Visits from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Visits.
     */
    skip?: number
    distinct?: VisitScalarFieldEnum | VisitScalarFieldEnum[]
  }

  /**
   * Visit create
   */
  export type VisitCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Visit
     */
    select?: VisitSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VisitInclude<ExtArgs> | null
    /**
     * The data needed to create a Visit.
     */
    data: XOR<VisitCreateInput, VisitUncheckedCreateInput>
  }

  /**
   * Visit createMany
   */
  export type VisitCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Visits.
     */
    data: VisitCreateManyInput | VisitCreateManyInput[]
  }

  /**
   * Visit createManyAndReturn
   */
  export type VisitCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Visit
     */
    select?: VisitSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Visits.
     */
    data: VisitCreateManyInput | VisitCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VisitIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Visit update
   */
  export type VisitUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Visit
     */
    select?: VisitSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VisitInclude<ExtArgs> | null
    /**
     * The data needed to update a Visit.
     */
    data: XOR<VisitUpdateInput, VisitUncheckedUpdateInput>
    /**
     * Choose, which Visit to update.
     */
    where: VisitWhereUniqueInput
  }

  /**
   * Visit updateMany
   */
  export type VisitUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Visits.
     */
    data: XOR<VisitUpdateManyMutationInput, VisitUncheckedUpdateManyInput>
    /**
     * Filter which Visits to update
     */
    where?: VisitWhereInput
  }

  /**
   * Visit upsert
   */
  export type VisitUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Visit
     */
    select?: VisitSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VisitInclude<ExtArgs> | null
    /**
     * The filter to search for the Visit to update in case it exists.
     */
    where: VisitWhereUniqueInput
    /**
     * In case the Visit found by the `where` argument doesn't exist, create a new Visit with this data.
     */
    create: XOR<VisitCreateInput, VisitUncheckedCreateInput>
    /**
     * In case the Visit was found with the provided `where` argument, update it with this data.
     */
    update: XOR<VisitUpdateInput, VisitUncheckedUpdateInput>
  }

  /**
   * Visit delete
   */
  export type VisitDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Visit
     */
    select?: VisitSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VisitInclude<ExtArgs> | null
    /**
     * Filter which Visit to delete.
     */
    where: VisitWhereUniqueInput
  }

  /**
   * Visit deleteMany
   */
  export type VisitDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Visits to delete
     */
    where?: VisitWhereInput
  }

  /**
   * Visit without action
   */
  export type VisitDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Visit
     */
    select?: VisitSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VisitInclude<ExtArgs> | null
  }


  /**
   * Model Appointment
   */

  export type AggregateAppointment = {
    _count: AppointmentCountAggregateOutputType | null
    _avg: AppointmentAvgAggregateOutputType | null
    _sum: AppointmentSumAggregateOutputType | null
    _min: AppointmentMinAggregateOutputType | null
    _max: AppointmentMaxAggregateOutputType | null
  }

  export type AppointmentAvgAggregateOutputType = {
    id: number | null
    clientId: number | null
    patientId: number | null
  }

  export type AppointmentSumAggregateOutputType = {
    id: number | null
    clientId: number | null
    patientId: number | null
  }

  export type AppointmentMinAggregateOutputType = {
    id: number | null
    startTime: Date | null
    endTime: Date | null
    description: string | null
    status: string | null
    clientId: number | null
    patientId: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AppointmentMaxAggregateOutputType = {
    id: number | null
    startTime: Date | null
    endTime: Date | null
    description: string | null
    status: string | null
    clientId: number | null
    patientId: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AppointmentCountAggregateOutputType = {
    id: number
    startTime: number
    endTime: number
    description: number
    status: number
    clientId: number
    patientId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type AppointmentAvgAggregateInputType = {
    id?: true
    clientId?: true
    patientId?: true
  }

  export type AppointmentSumAggregateInputType = {
    id?: true
    clientId?: true
    patientId?: true
  }

  export type AppointmentMinAggregateInputType = {
    id?: true
    startTime?: true
    endTime?: true
    description?: true
    status?: true
    clientId?: true
    patientId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AppointmentMaxAggregateInputType = {
    id?: true
    startTime?: true
    endTime?: true
    description?: true
    status?: true
    clientId?: true
    patientId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AppointmentCountAggregateInputType = {
    id?: true
    startTime?: true
    endTime?: true
    description?: true
    status?: true
    clientId?: true
    patientId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type AppointmentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Appointment to aggregate.
     */
    where?: AppointmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Appointments to fetch.
     */
    orderBy?: AppointmentOrderByWithRelationInput | AppointmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AppointmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Appointments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Appointments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Appointments
    **/
    _count?: true | AppointmentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AppointmentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AppointmentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AppointmentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AppointmentMaxAggregateInputType
  }

  export type GetAppointmentAggregateType<T extends AppointmentAggregateArgs> = {
        [P in keyof T & keyof AggregateAppointment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAppointment[P]>
      : GetScalarType<T[P], AggregateAppointment[P]>
  }




  export type AppointmentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AppointmentWhereInput
    orderBy?: AppointmentOrderByWithAggregationInput | AppointmentOrderByWithAggregationInput[]
    by: AppointmentScalarFieldEnum[] | AppointmentScalarFieldEnum
    having?: AppointmentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AppointmentCountAggregateInputType | true
    _avg?: AppointmentAvgAggregateInputType
    _sum?: AppointmentSumAggregateInputType
    _min?: AppointmentMinAggregateInputType
    _max?: AppointmentMaxAggregateInputType
  }

  export type AppointmentGroupByOutputType = {
    id: number
    startTime: Date
    endTime: Date
    description: string | null
    status: string
    clientId: number
    patientId: number
    createdAt: Date
    updatedAt: Date
    _count: AppointmentCountAggregateOutputType | null
    _avg: AppointmentAvgAggregateOutputType | null
    _sum: AppointmentSumAggregateOutputType | null
    _min: AppointmentMinAggregateOutputType | null
    _max: AppointmentMaxAggregateOutputType | null
  }

  type GetAppointmentGroupByPayload<T extends AppointmentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AppointmentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AppointmentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AppointmentGroupByOutputType[P]>
            : GetScalarType<T[P], AppointmentGroupByOutputType[P]>
        }
      >
    >


  export type AppointmentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    startTime?: boolean
    endTime?: boolean
    description?: boolean
    status?: boolean
    clientId?: boolean
    patientId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    client?: boolean | ClientDefaultArgs<ExtArgs>
    patient?: boolean | PatientDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["appointment"]>

  export type AppointmentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    startTime?: boolean
    endTime?: boolean
    description?: boolean
    status?: boolean
    clientId?: boolean
    patientId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    client?: boolean | ClientDefaultArgs<ExtArgs>
    patient?: boolean | PatientDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["appointment"]>

  export type AppointmentSelectScalar = {
    id?: boolean
    startTime?: boolean
    endTime?: boolean
    description?: boolean
    status?: boolean
    clientId?: boolean
    patientId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type AppointmentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    client?: boolean | ClientDefaultArgs<ExtArgs>
    patient?: boolean | PatientDefaultArgs<ExtArgs>
  }
  export type AppointmentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    client?: boolean | ClientDefaultArgs<ExtArgs>
    patient?: boolean | PatientDefaultArgs<ExtArgs>
  }

  export type $AppointmentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Appointment"
    objects: {
      client: Prisma.$ClientPayload<ExtArgs>
      patient: Prisma.$PatientPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      startTime: Date
      endTime: Date
      description: string | null
      status: string
      clientId: number
      patientId: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["appointment"]>
    composites: {}
  }

  type AppointmentGetPayload<S extends boolean | null | undefined | AppointmentDefaultArgs> = $Result.GetResult<Prisma.$AppointmentPayload, S>

  type AppointmentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<AppointmentFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: AppointmentCountAggregateInputType | true
    }

  export interface AppointmentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Appointment'], meta: { name: 'Appointment' } }
    /**
     * Find zero or one Appointment that matches the filter.
     * @param {AppointmentFindUniqueArgs} args - Arguments to find a Appointment
     * @example
     * // Get one Appointment
     * const appointment = await prisma.appointment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AppointmentFindUniqueArgs>(args: SelectSubset<T, AppointmentFindUniqueArgs<ExtArgs>>): Prisma__AppointmentClient<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Appointment that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {AppointmentFindUniqueOrThrowArgs} args - Arguments to find a Appointment
     * @example
     * // Get one Appointment
     * const appointment = await prisma.appointment.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AppointmentFindUniqueOrThrowArgs>(args: SelectSubset<T, AppointmentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AppointmentClient<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Appointment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppointmentFindFirstArgs} args - Arguments to find a Appointment
     * @example
     * // Get one Appointment
     * const appointment = await prisma.appointment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AppointmentFindFirstArgs>(args?: SelectSubset<T, AppointmentFindFirstArgs<ExtArgs>>): Prisma__AppointmentClient<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Appointment that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppointmentFindFirstOrThrowArgs} args - Arguments to find a Appointment
     * @example
     * // Get one Appointment
     * const appointment = await prisma.appointment.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AppointmentFindFirstOrThrowArgs>(args?: SelectSubset<T, AppointmentFindFirstOrThrowArgs<ExtArgs>>): Prisma__AppointmentClient<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Appointments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppointmentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Appointments
     * const appointments = await prisma.appointment.findMany()
     * 
     * // Get first 10 Appointments
     * const appointments = await prisma.appointment.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const appointmentWithIdOnly = await prisma.appointment.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AppointmentFindManyArgs>(args?: SelectSubset<T, AppointmentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Appointment.
     * @param {AppointmentCreateArgs} args - Arguments to create a Appointment.
     * @example
     * // Create one Appointment
     * const Appointment = await prisma.appointment.create({
     *   data: {
     *     // ... data to create a Appointment
     *   }
     * })
     * 
     */
    create<T extends AppointmentCreateArgs>(args: SelectSubset<T, AppointmentCreateArgs<ExtArgs>>): Prisma__AppointmentClient<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Appointments.
     * @param {AppointmentCreateManyArgs} args - Arguments to create many Appointments.
     * @example
     * // Create many Appointments
     * const appointment = await prisma.appointment.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AppointmentCreateManyArgs>(args?: SelectSubset<T, AppointmentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Appointments and returns the data saved in the database.
     * @param {AppointmentCreateManyAndReturnArgs} args - Arguments to create many Appointments.
     * @example
     * // Create many Appointments
     * const appointment = await prisma.appointment.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Appointments and only return the `id`
     * const appointmentWithIdOnly = await prisma.appointment.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AppointmentCreateManyAndReturnArgs>(args?: SelectSubset<T, AppointmentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Appointment.
     * @param {AppointmentDeleteArgs} args - Arguments to delete one Appointment.
     * @example
     * // Delete one Appointment
     * const Appointment = await prisma.appointment.delete({
     *   where: {
     *     // ... filter to delete one Appointment
     *   }
     * })
     * 
     */
    delete<T extends AppointmentDeleteArgs>(args: SelectSubset<T, AppointmentDeleteArgs<ExtArgs>>): Prisma__AppointmentClient<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Appointment.
     * @param {AppointmentUpdateArgs} args - Arguments to update one Appointment.
     * @example
     * // Update one Appointment
     * const appointment = await prisma.appointment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AppointmentUpdateArgs>(args: SelectSubset<T, AppointmentUpdateArgs<ExtArgs>>): Prisma__AppointmentClient<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Appointments.
     * @param {AppointmentDeleteManyArgs} args - Arguments to filter Appointments to delete.
     * @example
     * // Delete a few Appointments
     * const { count } = await prisma.appointment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AppointmentDeleteManyArgs>(args?: SelectSubset<T, AppointmentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Appointments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppointmentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Appointments
     * const appointment = await prisma.appointment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AppointmentUpdateManyArgs>(args: SelectSubset<T, AppointmentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Appointment.
     * @param {AppointmentUpsertArgs} args - Arguments to update or create a Appointment.
     * @example
     * // Update or create a Appointment
     * const appointment = await prisma.appointment.upsert({
     *   create: {
     *     // ... data to create a Appointment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Appointment we want to update
     *   }
     * })
     */
    upsert<T extends AppointmentUpsertArgs>(args: SelectSubset<T, AppointmentUpsertArgs<ExtArgs>>): Prisma__AppointmentClient<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Appointments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppointmentCountArgs} args - Arguments to filter Appointments to count.
     * @example
     * // Count the number of Appointments
     * const count = await prisma.appointment.count({
     *   where: {
     *     // ... the filter for the Appointments we want to count
     *   }
     * })
    **/
    count<T extends AppointmentCountArgs>(
      args?: Subset<T, AppointmentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AppointmentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Appointment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppointmentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AppointmentAggregateArgs>(args: Subset<T, AppointmentAggregateArgs>): Prisma.PrismaPromise<GetAppointmentAggregateType<T>>

    /**
     * Group by Appointment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppointmentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AppointmentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AppointmentGroupByArgs['orderBy'] }
        : { orderBy?: AppointmentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AppointmentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAppointmentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Appointment model
   */
  readonly fields: AppointmentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Appointment.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AppointmentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    client<T extends ClientDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ClientDefaultArgs<ExtArgs>>): Prisma__ClientClient<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    patient<T extends PatientDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PatientDefaultArgs<ExtArgs>>): Prisma__PatientClient<$Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Appointment model
   */ 
  interface AppointmentFieldRefs {
    readonly id: FieldRef<"Appointment", 'Int'>
    readonly startTime: FieldRef<"Appointment", 'DateTime'>
    readonly endTime: FieldRef<"Appointment", 'DateTime'>
    readonly description: FieldRef<"Appointment", 'String'>
    readonly status: FieldRef<"Appointment", 'String'>
    readonly clientId: FieldRef<"Appointment", 'Int'>
    readonly patientId: FieldRef<"Appointment", 'Int'>
    readonly createdAt: FieldRef<"Appointment", 'DateTime'>
    readonly updatedAt: FieldRef<"Appointment", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Appointment findUnique
   */
  export type AppointmentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
    /**
     * Filter, which Appointment to fetch.
     */
    where: AppointmentWhereUniqueInput
  }

  /**
   * Appointment findUniqueOrThrow
   */
  export type AppointmentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
    /**
     * Filter, which Appointment to fetch.
     */
    where: AppointmentWhereUniqueInput
  }

  /**
   * Appointment findFirst
   */
  export type AppointmentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
    /**
     * Filter, which Appointment to fetch.
     */
    where?: AppointmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Appointments to fetch.
     */
    orderBy?: AppointmentOrderByWithRelationInput | AppointmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Appointments.
     */
    cursor?: AppointmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Appointments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Appointments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Appointments.
     */
    distinct?: AppointmentScalarFieldEnum | AppointmentScalarFieldEnum[]
  }

  /**
   * Appointment findFirstOrThrow
   */
  export type AppointmentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
    /**
     * Filter, which Appointment to fetch.
     */
    where?: AppointmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Appointments to fetch.
     */
    orderBy?: AppointmentOrderByWithRelationInput | AppointmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Appointments.
     */
    cursor?: AppointmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Appointments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Appointments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Appointments.
     */
    distinct?: AppointmentScalarFieldEnum | AppointmentScalarFieldEnum[]
  }

  /**
   * Appointment findMany
   */
  export type AppointmentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
    /**
     * Filter, which Appointments to fetch.
     */
    where?: AppointmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Appointments to fetch.
     */
    orderBy?: AppointmentOrderByWithRelationInput | AppointmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Appointments.
     */
    cursor?: AppointmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Appointments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Appointments.
     */
    skip?: number
    distinct?: AppointmentScalarFieldEnum | AppointmentScalarFieldEnum[]
  }

  /**
   * Appointment create
   */
  export type AppointmentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
    /**
     * The data needed to create a Appointment.
     */
    data: XOR<AppointmentCreateInput, AppointmentUncheckedCreateInput>
  }

  /**
   * Appointment createMany
   */
  export type AppointmentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Appointments.
     */
    data: AppointmentCreateManyInput | AppointmentCreateManyInput[]
  }

  /**
   * Appointment createManyAndReturn
   */
  export type AppointmentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Appointments.
     */
    data: AppointmentCreateManyInput | AppointmentCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Appointment update
   */
  export type AppointmentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
    /**
     * The data needed to update a Appointment.
     */
    data: XOR<AppointmentUpdateInput, AppointmentUncheckedUpdateInput>
    /**
     * Choose, which Appointment to update.
     */
    where: AppointmentWhereUniqueInput
  }

  /**
   * Appointment updateMany
   */
  export type AppointmentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Appointments.
     */
    data: XOR<AppointmentUpdateManyMutationInput, AppointmentUncheckedUpdateManyInput>
    /**
     * Filter which Appointments to update
     */
    where?: AppointmentWhereInput
  }

  /**
   * Appointment upsert
   */
  export type AppointmentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
    /**
     * The filter to search for the Appointment to update in case it exists.
     */
    where: AppointmentWhereUniqueInput
    /**
     * In case the Appointment found by the `where` argument doesn't exist, create a new Appointment with this data.
     */
    create: XOR<AppointmentCreateInput, AppointmentUncheckedCreateInput>
    /**
     * In case the Appointment was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AppointmentUpdateInput, AppointmentUncheckedUpdateInput>
  }

  /**
   * Appointment delete
   */
  export type AppointmentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
    /**
     * Filter which Appointment to delete.
     */
    where: AppointmentWhereUniqueInput
  }

  /**
   * Appointment deleteMany
   */
  export type AppointmentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Appointments to delete
     */
    where?: AppointmentWhereInput
  }

  /**
   * Appointment without action
   */
  export type AppointmentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
  }


  /**
   * Model ClinicConfig
   */

  export type AggregateClinicConfig = {
    _count: ClinicConfigCountAggregateOutputType | null
    _avg: ClinicConfigAvgAggregateOutputType | null
    _sum: ClinicConfigSumAggregateOutputType | null
    _min: ClinicConfigMinAggregateOutputType | null
    _max: ClinicConfigMaxAggregateOutputType | null
  }

  export type ClinicConfigAvgAggregateOutputType = {
    id: number | null
    taxRate: number | null
  }

  export type ClinicConfigSumAggregateOutputType = {
    id: number | null
    taxRate: number | null
  }

  export type ClinicConfigMinAggregateOutputType = {
    id: number | null
    name: string | null
    logoUrl: string | null
    email: string | null
    phone: string | null
    address: string | null
    units: string | null
    dateFormat: string | null
    hoursOfOperation: string | null
    websiteUrl: string | null
    taxRate: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ClinicConfigMaxAggregateOutputType = {
    id: number | null
    name: string | null
    logoUrl: string | null
    email: string | null
    phone: string | null
    address: string | null
    units: string | null
    dateFormat: string | null
    hoursOfOperation: string | null
    websiteUrl: string | null
    taxRate: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ClinicConfigCountAggregateOutputType = {
    id: number
    name: number
    logoUrl: number
    email: number
    phone: number
    address: number
    units: number
    dateFormat: number
    hoursOfOperation: number
    websiteUrl: number
    taxRate: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ClinicConfigAvgAggregateInputType = {
    id?: true
    taxRate?: true
  }

  export type ClinicConfigSumAggregateInputType = {
    id?: true
    taxRate?: true
  }

  export type ClinicConfigMinAggregateInputType = {
    id?: true
    name?: true
    logoUrl?: true
    email?: true
    phone?: true
    address?: true
    units?: true
    dateFormat?: true
    hoursOfOperation?: true
    websiteUrl?: true
    taxRate?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ClinicConfigMaxAggregateInputType = {
    id?: true
    name?: true
    logoUrl?: true
    email?: true
    phone?: true
    address?: true
    units?: true
    dateFormat?: true
    hoursOfOperation?: true
    websiteUrl?: true
    taxRate?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ClinicConfigCountAggregateInputType = {
    id?: true
    name?: true
    logoUrl?: true
    email?: true
    phone?: true
    address?: true
    units?: true
    dateFormat?: true
    hoursOfOperation?: true
    websiteUrl?: true
    taxRate?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ClinicConfigAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ClinicConfig to aggregate.
     */
    where?: ClinicConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ClinicConfigs to fetch.
     */
    orderBy?: ClinicConfigOrderByWithRelationInput | ClinicConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ClinicConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ClinicConfigs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ClinicConfigs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ClinicConfigs
    **/
    _count?: true | ClinicConfigCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ClinicConfigAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ClinicConfigSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ClinicConfigMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ClinicConfigMaxAggregateInputType
  }

  export type GetClinicConfigAggregateType<T extends ClinicConfigAggregateArgs> = {
        [P in keyof T & keyof AggregateClinicConfig]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateClinicConfig[P]>
      : GetScalarType<T[P], AggregateClinicConfig[P]>
  }




  export type ClinicConfigGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ClinicConfigWhereInput
    orderBy?: ClinicConfigOrderByWithAggregationInput | ClinicConfigOrderByWithAggregationInput[]
    by: ClinicConfigScalarFieldEnum[] | ClinicConfigScalarFieldEnum
    having?: ClinicConfigScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ClinicConfigCountAggregateInputType | true
    _avg?: ClinicConfigAvgAggregateInputType
    _sum?: ClinicConfigSumAggregateInputType
    _min?: ClinicConfigMinAggregateInputType
    _max?: ClinicConfigMaxAggregateInputType
  }

  export type ClinicConfigGroupByOutputType = {
    id: number
    name: string
    logoUrl: string | null
    email: string | null
    phone: string | null
    address: string | null
    units: string
    dateFormat: string
    hoursOfOperation: string | null
    websiteUrl: string | null
    taxRate: number
    createdAt: Date
    updatedAt: Date
    _count: ClinicConfigCountAggregateOutputType | null
    _avg: ClinicConfigAvgAggregateOutputType | null
    _sum: ClinicConfigSumAggregateOutputType | null
    _min: ClinicConfigMinAggregateOutputType | null
    _max: ClinicConfigMaxAggregateOutputType | null
  }

  type GetClinicConfigGroupByPayload<T extends ClinicConfigGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ClinicConfigGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ClinicConfigGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ClinicConfigGroupByOutputType[P]>
            : GetScalarType<T[P], ClinicConfigGroupByOutputType[P]>
        }
      >
    >


  export type ClinicConfigSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    logoUrl?: boolean
    email?: boolean
    phone?: boolean
    address?: boolean
    units?: boolean
    dateFormat?: boolean
    hoursOfOperation?: boolean
    websiteUrl?: boolean
    taxRate?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["clinicConfig"]>

  export type ClinicConfigSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    logoUrl?: boolean
    email?: boolean
    phone?: boolean
    address?: boolean
    units?: boolean
    dateFormat?: boolean
    hoursOfOperation?: boolean
    websiteUrl?: boolean
    taxRate?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["clinicConfig"]>

  export type ClinicConfigSelectScalar = {
    id?: boolean
    name?: boolean
    logoUrl?: boolean
    email?: boolean
    phone?: boolean
    address?: boolean
    units?: boolean
    dateFormat?: boolean
    hoursOfOperation?: boolean
    websiteUrl?: boolean
    taxRate?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }


  export type $ClinicConfigPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ClinicConfig"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      logoUrl: string | null
      email: string | null
      phone: string | null
      address: string | null
      units: string
      dateFormat: string
      hoursOfOperation: string | null
      websiteUrl: string | null
      taxRate: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["clinicConfig"]>
    composites: {}
  }

  type ClinicConfigGetPayload<S extends boolean | null | undefined | ClinicConfigDefaultArgs> = $Result.GetResult<Prisma.$ClinicConfigPayload, S>

  type ClinicConfigCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ClinicConfigFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ClinicConfigCountAggregateInputType | true
    }

  export interface ClinicConfigDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ClinicConfig'], meta: { name: 'ClinicConfig' } }
    /**
     * Find zero or one ClinicConfig that matches the filter.
     * @param {ClinicConfigFindUniqueArgs} args - Arguments to find a ClinicConfig
     * @example
     * // Get one ClinicConfig
     * const clinicConfig = await prisma.clinicConfig.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ClinicConfigFindUniqueArgs>(args: SelectSubset<T, ClinicConfigFindUniqueArgs<ExtArgs>>): Prisma__ClinicConfigClient<$Result.GetResult<Prisma.$ClinicConfigPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one ClinicConfig that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ClinicConfigFindUniqueOrThrowArgs} args - Arguments to find a ClinicConfig
     * @example
     * // Get one ClinicConfig
     * const clinicConfig = await prisma.clinicConfig.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ClinicConfigFindUniqueOrThrowArgs>(args: SelectSubset<T, ClinicConfigFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ClinicConfigClient<$Result.GetResult<Prisma.$ClinicConfigPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first ClinicConfig that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClinicConfigFindFirstArgs} args - Arguments to find a ClinicConfig
     * @example
     * // Get one ClinicConfig
     * const clinicConfig = await prisma.clinicConfig.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ClinicConfigFindFirstArgs>(args?: SelectSubset<T, ClinicConfigFindFirstArgs<ExtArgs>>): Prisma__ClinicConfigClient<$Result.GetResult<Prisma.$ClinicConfigPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first ClinicConfig that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClinicConfigFindFirstOrThrowArgs} args - Arguments to find a ClinicConfig
     * @example
     * // Get one ClinicConfig
     * const clinicConfig = await prisma.clinicConfig.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ClinicConfigFindFirstOrThrowArgs>(args?: SelectSubset<T, ClinicConfigFindFirstOrThrowArgs<ExtArgs>>): Prisma__ClinicConfigClient<$Result.GetResult<Prisma.$ClinicConfigPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more ClinicConfigs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClinicConfigFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ClinicConfigs
     * const clinicConfigs = await prisma.clinicConfig.findMany()
     * 
     * // Get first 10 ClinicConfigs
     * const clinicConfigs = await prisma.clinicConfig.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const clinicConfigWithIdOnly = await prisma.clinicConfig.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ClinicConfigFindManyArgs>(args?: SelectSubset<T, ClinicConfigFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClinicConfigPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a ClinicConfig.
     * @param {ClinicConfigCreateArgs} args - Arguments to create a ClinicConfig.
     * @example
     * // Create one ClinicConfig
     * const ClinicConfig = await prisma.clinicConfig.create({
     *   data: {
     *     // ... data to create a ClinicConfig
     *   }
     * })
     * 
     */
    create<T extends ClinicConfigCreateArgs>(args: SelectSubset<T, ClinicConfigCreateArgs<ExtArgs>>): Prisma__ClinicConfigClient<$Result.GetResult<Prisma.$ClinicConfigPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many ClinicConfigs.
     * @param {ClinicConfigCreateManyArgs} args - Arguments to create many ClinicConfigs.
     * @example
     * // Create many ClinicConfigs
     * const clinicConfig = await prisma.clinicConfig.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ClinicConfigCreateManyArgs>(args?: SelectSubset<T, ClinicConfigCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ClinicConfigs and returns the data saved in the database.
     * @param {ClinicConfigCreateManyAndReturnArgs} args - Arguments to create many ClinicConfigs.
     * @example
     * // Create many ClinicConfigs
     * const clinicConfig = await prisma.clinicConfig.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ClinicConfigs and only return the `id`
     * const clinicConfigWithIdOnly = await prisma.clinicConfig.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ClinicConfigCreateManyAndReturnArgs>(args?: SelectSubset<T, ClinicConfigCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClinicConfigPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a ClinicConfig.
     * @param {ClinicConfigDeleteArgs} args - Arguments to delete one ClinicConfig.
     * @example
     * // Delete one ClinicConfig
     * const ClinicConfig = await prisma.clinicConfig.delete({
     *   where: {
     *     // ... filter to delete one ClinicConfig
     *   }
     * })
     * 
     */
    delete<T extends ClinicConfigDeleteArgs>(args: SelectSubset<T, ClinicConfigDeleteArgs<ExtArgs>>): Prisma__ClinicConfigClient<$Result.GetResult<Prisma.$ClinicConfigPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one ClinicConfig.
     * @param {ClinicConfigUpdateArgs} args - Arguments to update one ClinicConfig.
     * @example
     * // Update one ClinicConfig
     * const clinicConfig = await prisma.clinicConfig.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ClinicConfigUpdateArgs>(args: SelectSubset<T, ClinicConfigUpdateArgs<ExtArgs>>): Prisma__ClinicConfigClient<$Result.GetResult<Prisma.$ClinicConfigPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more ClinicConfigs.
     * @param {ClinicConfigDeleteManyArgs} args - Arguments to filter ClinicConfigs to delete.
     * @example
     * // Delete a few ClinicConfigs
     * const { count } = await prisma.clinicConfig.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ClinicConfigDeleteManyArgs>(args?: SelectSubset<T, ClinicConfigDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ClinicConfigs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClinicConfigUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ClinicConfigs
     * const clinicConfig = await prisma.clinicConfig.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ClinicConfigUpdateManyArgs>(args: SelectSubset<T, ClinicConfigUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one ClinicConfig.
     * @param {ClinicConfigUpsertArgs} args - Arguments to update or create a ClinicConfig.
     * @example
     * // Update or create a ClinicConfig
     * const clinicConfig = await prisma.clinicConfig.upsert({
     *   create: {
     *     // ... data to create a ClinicConfig
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ClinicConfig we want to update
     *   }
     * })
     */
    upsert<T extends ClinicConfigUpsertArgs>(args: SelectSubset<T, ClinicConfigUpsertArgs<ExtArgs>>): Prisma__ClinicConfigClient<$Result.GetResult<Prisma.$ClinicConfigPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of ClinicConfigs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClinicConfigCountArgs} args - Arguments to filter ClinicConfigs to count.
     * @example
     * // Count the number of ClinicConfigs
     * const count = await prisma.clinicConfig.count({
     *   where: {
     *     // ... the filter for the ClinicConfigs we want to count
     *   }
     * })
    **/
    count<T extends ClinicConfigCountArgs>(
      args?: Subset<T, ClinicConfigCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ClinicConfigCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ClinicConfig.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClinicConfigAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ClinicConfigAggregateArgs>(args: Subset<T, ClinicConfigAggregateArgs>): Prisma.PrismaPromise<GetClinicConfigAggregateType<T>>

    /**
     * Group by ClinicConfig.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClinicConfigGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ClinicConfigGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ClinicConfigGroupByArgs['orderBy'] }
        : { orderBy?: ClinicConfigGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ClinicConfigGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetClinicConfigGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ClinicConfig model
   */
  readonly fields: ClinicConfigFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ClinicConfig.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ClinicConfigClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ClinicConfig model
   */ 
  interface ClinicConfigFieldRefs {
    readonly id: FieldRef<"ClinicConfig", 'Int'>
    readonly name: FieldRef<"ClinicConfig", 'String'>
    readonly logoUrl: FieldRef<"ClinicConfig", 'String'>
    readonly email: FieldRef<"ClinicConfig", 'String'>
    readonly phone: FieldRef<"ClinicConfig", 'String'>
    readonly address: FieldRef<"ClinicConfig", 'String'>
    readonly units: FieldRef<"ClinicConfig", 'String'>
    readonly dateFormat: FieldRef<"ClinicConfig", 'String'>
    readonly hoursOfOperation: FieldRef<"ClinicConfig", 'String'>
    readonly websiteUrl: FieldRef<"ClinicConfig", 'String'>
    readonly taxRate: FieldRef<"ClinicConfig", 'Float'>
    readonly createdAt: FieldRef<"ClinicConfig", 'DateTime'>
    readonly updatedAt: FieldRef<"ClinicConfig", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ClinicConfig findUnique
   */
  export type ClinicConfigFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClinicConfig
     */
    select?: ClinicConfigSelect<ExtArgs> | null
    /**
     * Filter, which ClinicConfig to fetch.
     */
    where: ClinicConfigWhereUniqueInput
  }

  /**
   * ClinicConfig findUniqueOrThrow
   */
  export type ClinicConfigFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClinicConfig
     */
    select?: ClinicConfigSelect<ExtArgs> | null
    /**
     * Filter, which ClinicConfig to fetch.
     */
    where: ClinicConfigWhereUniqueInput
  }

  /**
   * ClinicConfig findFirst
   */
  export type ClinicConfigFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClinicConfig
     */
    select?: ClinicConfigSelect<ExtArgs> | null
    /**
     * Filter, which ClinicConfig to fetch.
     */
    where?: ClinicConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ClinicConfigs to fetch.
     */
    orderBy?: ClinicConfigOrderByWithRelationInput | ClinicConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ClinicConfigs.
     */
    cursor?: ClinicConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ClinicConfigs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ClinicConfigs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ClinicConfigs.
     */
    distinct?: ClinicConfigScalarFieldEnum | ClinicConfigScalarFieldEnum[]
  }

  /**
   * ClinicConfig findFirstOrThrow
   */
  export type ClinicConfigFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClinicConfig
     */
    select?: ClinicConfigSelect<ExtArgs> | null
    /**
     * Filter, which ClinicConfig to fetch.
     */
    where?: ClinicConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ClinicConfigs to fetch.
     */
    orderBy?: ClinicConfigOrderByWithRelationInput | ClinicConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ClinicConfigs.
     */
    cursor?: ClinicConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ClinicConfigs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ClinicConfigs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ClinicConfigs.
     */
    distinct?: ClinicConfigScalarFieldEnum | ClinicConfigScalarFieldEnum[]
  }

  /**
   * ClinicConfig findMany
   */
  export type ClinicConfigFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClinicConfig
     */
    select?: ClinicConfigSelect<ExtArgs> | null
    /**
     * Filter, which ClinicConfigs to fetch.
     */
    where?: ClinicConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ClinicConfigs to fetch.
     */
    orderBy?: ClinicConfigOrderByWithRelationInput | ClinicConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ClinicConfigs.
     */
    cursor?: ClinicConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ClinicConfigs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ClinicConfigs.
     */
    skip?: number
    distinct?: ClinicConfigScalarFieldEnum | ClinicConfigScalarFieldEnum[]
  }

  /**
   * ClinicConfig create
   */
  export type ClinicConfigCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClinicConfig
     */
    select?: ClinicConfigSelect<ExtArgs> | null
    /**
     * The data needed to create a ClinicConfig.
     */
    data: XOR<ClinicConfigCreateInput, ClinicConfigUncheckedCreateInput>
  }

  /**
   * ClinicConfig createMany
   */
  export type ClinicConfigCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ClinicConfigs.
     */
    data: ClinicConfigCreateManyInput | ClinicConfigCreateManyInput[]
  }

  /**
   * ClinicConfig createManyAndReturn
   */
  export type ClinicConfigCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClinicConfig
     */
    select?: ClinicConfigSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many ClinicConfigs.
     */
    data: ClinicConfigCreateManyInput | ClinicConfigCreateManyInput[]
  }

  /**
   * ClinicConfig update
   */
  export type ClinicConfigUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClinicConfig
     */
    select?: ClinicConfigSelect<ExtArgs> | null
    /**
     * The data needed to update a ClinicConfig.
     */
    data: XOR<ClinicConfigUpdateInput, ClinicConfigUncheckedUpdateInput>
    /**
     * Choose, which ClinicConfig to update.
     */
    where: ClinicConfigWhereUniqueInput
  }

  /**
   * ClinicConfig updateMany
   */
  export type ClinicConfigUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ClinicConfigs.
     */
    data: XOR<ClinicConfigUpdateManyMutationInput, ClinicConfigUncheckedUpdateManyInput>
    /**
     * Filter which ClinicConfigs to update
     */
    where?: ClinicConfigWhereInput
  }

  /**
   * ClinicConfig upsert
   */
  export type ClinicConfigUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClinicConfig
     */
    select?: ClinicConfigSelect<ExtArgs> | null
    /**
     * The filter to search for the ClinicConfig to update in case it exists.
     */
    where: ClinicConfigWhereUniqueInput
    /**
     * In case the ClinicConfig found by the `where` argument doesn't exist, create a new ClinicConfig with this data.
     */
    create: XOR<ClinicConfigCreateInput, ClinicConfigUncheckedCreateInput>
    /**
     * In case the ClinicConfig was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ClinicConfigUpdateInput, ClinicConfigUncheckedUpdateInput>
  }

  /**
   * ClinicConfig delete
   */
  export type ClinicConfigDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClinicConfig
     */
    select?: ClinicConfigSelect<ExtArgs> | null
    /**
     * Filter which ClinicConfig to delete.
     */
    where: ClinicConfigWhereUniqueInput
  }

  /**
   * ClinicConfig deleteMany
   */
  export type ClinicConfigDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ClinicConfigs to delete
     */
    where?: ClinicConfigWhereInput
  }

  /**
   * ClinicConfig without action
   */
  export type ClinicConfigDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClinicConfig
     */
    select?: ClinicConfigSelect<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const ClientScalarFieldEnum: {
    id: 'id',
    firstName: 'firstName',
    lastName: 'lastName',
    email: 'email',
    phone: 'phone',
    secondaryPhone: 'secondaryPhone',
    address: 'address',
    emergencyContactName: 'emergencyContactName',
    emergencyContactPhone: 'emergencyContactPhone',
    notes: 'notes',
    dob: 'dob',
    gender: 'gender',
    driverLicenseState: 'driverLicenseState',
    driverLicenseNumber: 'driverLicenseNumber',
    driverLicenseExp: 'driverLicenseExp',
    clientType: 'clientType',
    active: 'active',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ClientScalarFieldEnum = (typeof ClientScalarFieldEnum)[keyof typeof ClientScalarFieldEnum]


  export const PatientScalarFieldEnum: {
    id: 'id',
    name: 'name',
    species: 'species',
    breed: 'breed',
    sex: 'sex',
    weight: 'weight',
    microchipNumber: 'microchipNumber',
    color: 'color',
    birthDate: 'birthDate',
    notes: 'notes',
    clientId: 'clientId',
    photoUrl: 'photoUrl',
    rabiesTag: 'rabiesTag',
    preferredProvider: 'preferredProvider',
    referralSource: 'referralSource',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type PatientScalarFieldEnum = (typeof PatientScalarFieldEnum)[keyof typeof PatientScalarFieldEnum]


  export const VetScalarFieldEnum: {
    id: 'id',
    name: 'name',
    email: 'email',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type VetScalarFieldEnum = (typeof VetScalarFieldEnum)[keyof typeof VetScalarFieldEnum]


  export const VisitScalarFieldEnum: {
    id: 'id',
    date: 'date',
    notes: 'notes',
    patientId: 'patientId',
    vetId: 'vetId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type VisitScalarFieldEnum = (typeof VisitScalarFieldEnum)[keyof typeof VisitScalarFieldEnum]


  export const AppointmentScalarFieldEnum: {
    id: 'id',
    startTime: 'startTime',
    endTime: 'endTime',
    description: 'description',
    status: 'status',
    clientId: 'clientId',
    patientId: 'patientId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type AppointmentScalarFieldEnum = (typeof AppointmentScalarFieldEnum)[keyof typeof AppointmentScalarFieldEnum]


  export const ClinicConfigScalarFieldEnum: {
    id: 'id',
    name: 'name',
    logoUrl: 'logoUrl',
    email: 'email',
    phone: 'phone',
    address: 'address',
    units: 'units',
    dateFormat: 'dateFormat',
    hoursOfOperation: 'hoursOfOperation',
    websiteUrl: 'websiteUrl',
    taxRate: 'taxRate',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ClinicConfigScalarFieldEnum = (typeof ClinicConfigScalarFieldEnum)[keyof typeof ClinicConfigScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references 
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    
  /**
   * Deep Input Types
   */


  export type ClientWhereInput = {
    AND?: ClientWhereInput | ClientWhereInput[]
    OR?: ClientWhereInput[]
    NOT?: ClientWhereInput | ClientWhereInput[]
    id?: IntFilter<"Client"> | number
    firstName?: StringFilter<"Client"> | string
    lastName?: StringFilter<"Client"> | string
    email?: StringNullableFilter<"Client"> | string | null
    phone?: StringNullableFilter<"Client"> | string | null
    secondaryPhone?: StringNullableFilter<"Client"> | string | null
    address?: StringNullableFilter<"Client"> | string | null
    emergencyContactName?: StringNullableFilter<"Client"> | string | null
    emergencyContactPhone?: StringNullableFilter<"Client"> | string | null
    notes?: StringNullableFilter<"Client"> | string | null
    dob?: DateTimeNullableFilter<"Client"> | Date | string | null
    gender?: StringNullableFilter<"Client"> | string | null
    driverLicenseState?: StringNullableFilter<"Client"> | string | null
    driverLicenseNumber?: StringNullableFilter<"Client"> | string | null
    driverLicenseExp?: StringNullableFilter<"Client"> | string | null
    clientType?: StringNullableFilter<"Client"> | string | null
    active?: BoolFilter<"Client"> | boolean
    createdAt?: DateTimeFilter<"Client"> | Date | string
    updatedAt?: DateTimeFilter<"Client"> | Date | string
    pets?: PatientListRelationFilter
    appointments?: AppointmentListRelationFilter
  }

  export type ClientOrderByWithRelationInput = {
    id?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    email?: SortOrderInput | SortOrder
    phone?: SortOrderInput | SortOrder
    secondaryPhone?: SortOrderInput | SortOrder
    address?: SortOrderInput | SortOrder
    emergencyContactName?: SortOrderInput | SortOrder
    emergencyContactPhone?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
    dob?: SortOrderInput | SortOrder
    gender?: SortOrderInput | SortOrder
    driverLicenseState?: SortOrderInput | SortOrder
    driverLicenseNumber?: SortOrderInput | SortOrder
    driverLicenseExp?: SortOrderInput | SortOrder
    clientType?: SortOrderInput | SortOrder
    active?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    pets?: PatientOrderByRelationAggregateInput
    appointments?: AppointmentOrderByRelationAggregateInput
  }

  export type ClientWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: ClientWhereInput | ClientWhereInput[]
    OR?: ClientWhereInput[]
    NOT?: ClientWhereInput | ClientWhereInput[]
    firstName?: StringFilter<"Client"> | string
    lastName?: StringFilter<"Client"> | string
    email?: StringNullableFilter<"Client"> | string | null
    phone?: StringNullableFilter<"Client"> | string | null
    secondaryPhone?: StringNullableFilter<"Client"> | string | null
    address?: StringNullableFilter<"Client"> | string | null
    emergencyContactName?: StringNullableFilter<"Client"> | string | null
    emergencyContactPhone?: StringNullableFilter<"Client"> | string | null
    notes?: StringNullableFilter<"Client"> | string | null
    dob?: DateTimeNullableFilter<"Client"> | Date | string | null
    gender?: StringNullableFilter<"Client"> | string | null
    driverLicenseState?: StringNullableFilter<"Client"> | string | null
    driverLicenseNumber?: StringNullableFilter<"Client"> | string | null
    driverLicenseExp?: StringNullableFilter<"Client"> | string | null
    clientType?: StringNullableFilter<"Client"> | string | null
    active?: BoolFilter<"Client"> | boolean
    createdAt?: DateTimeFilter<"Client"> | Date | string
    updatedAt?: DateTimeFilter<"Client"> | Date | string
    pets?: PatientListRelationFilter
    appointments?: AppointmentListRelationFilter
  }, "id">

  export type ClientOrderByWithAggregationInput = {
    id?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    email?: SortOrderInput | SortOrder
    phone?: SortOrderInput | SortOrder
    secondaryPhone?: SortOrderInput | SortOrder
    address?: SortOrderInput | SortOrder
    emergencyContactName?: SortOrderInput | SortOrder
    emergencyContactPhone?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
    dob?: SortOrderInput | SortOrder
    gender?: SortOrderInput | SortOrder
    driverLicenseState?: SortOrderInput | SortOrder
    driverLicenseNumber?: SortOrderInput | SortOrder
    driverLicenseExp?: SortOrderInput | SortOrder
    clientType?: SortOrderInput | SortOrder
    active?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ClientCountOrderByAggregateInput
    _avg?: ClientAvgOrderByAggregateInput
    _max?: ClientMaxOrderByAggregateInput
    _min?: ClientMinOrderByAggregateInput
    _sum?: ClientSumOrderByAggregateInput
  }

  export type ClientScalarWhereWithAggregatesInput = {
    AND?: ClientScalarWhereWithAggregatesInput | ClientScalarWhereWithAggregatesInput[]
    OR?: ClientScalarWhereWithAggregatesInput[]
    NOT?: ClientScalarWhereWithAggregatesInput | ClientScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Client"> | number
    firstName?: StringWithAggregatesFilter<"Client"> | string
    lastName?: StringWithAggregatesFilter<"Client"> | string
    email?: StringNullableWithAggregatesFilter<"Client"> | string | null
    phone?: StringNullableWithAggregatesFilter<"Client"> | string | null
    secondaryPhone?: StringNullableWithAggregatesFilter<"Client"> | string | null
    address?: StringNullableWithAggregatesFilter<"Client"> | string | null
    emergencyContactName?: StringNullableWithAggregatesFilter<"Client"> | string | null
    emergencyContactPhone?: StringNullableWithAggregatesFilter<"Client"> | string | null
    notes?: StringNullableWithAggregatesFilter<"Client"> | string | null
    dob?: DateTimeNullableWithAggregatesFilter<"Client"> | Date | string | null
    gender?: StringNullableWithAggregatesFilter<"Client"> | string | null
    driverLicenseState?: StringNullableWithAggregatesFilter<"Client"> | string | null
    driverLicenseNumber?: StringNullableWithAggregatesFilter<"Client"> | string | null
    driverLicenseExp?: StringNullableWithAggregatesFilter<"Client"> | string | null
    clientType?: StringNullableWithAggregatesFilter<"Client"> | string | null
    active?: BoolWithAggregatesFilter<"Client"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Client"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Client"> | Date | string
  }

  export type PatientWhereInput = {
    AND?: PatientWhereInput | PatientWhereInput[]
    OR?: PatientWhereInput[]
    NOT?: PatientWhereInput | PatientWhereInput[]
    id?: IntFilter<"Patient"> | number
    name?: StringFilter<"Patient"> | string
    species?: StringFilter<"Patient"> | string
    breed?: StringNullableFilter<"Patient"> | string | null
    sex?: StringNullableFilter<"Patient"> | string | null
    weight?: FloatNullableFilter<"Patient"> | number | null
    microchipNumber?: StringNullableFilter<"Patient"> | string | null
    color?: StringNullableFilter<"Patient"> | string | null
    birthDate?: DateTimeNullableFilter<"Patient"> | Date | string | null
    notes?: StringNullableFilter<"Patient"> | string | null
    clientId?: IntFilter<"Patient"> | number
    photoUrl?: StringNullableFilter<"Patient"> | string | null
    rabiesTag?: StringNullableFilter<"Patient"> | string | null
    preferredProvider?: StringNullableFilter<"Patient"> | string | null
    referralSource?: StringNullableFilter<"Patient"> | string | null
    createdAt?: DateTimeFilter<"Patient"> | Date | string
    updatedAt?: DateTimeFilter<"Patient"> | Date | string
    client?: XOR<ClientRelationFilter, ClientWhereInput>
    visits?: VisitListRelationFilter
    appointments?: AppointmentListRelationFilter
  }

  export type PatientOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    species?: SortOrder
    breed?: SortOrderInput | SortOrder
    sex?: SortOrderInput | SortOrder
    weight?: SortOrderInput | SortOrder
    microchipNumber?: SortOrderInput | SortOrder
    color?: SortOrderInput | SortOrder
    birthDate?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
    clientId?: SortOrder
    photoUrl?: SortOrderInput | SortOrder
    rabiesTag?: SortOrderInput | SortOrder
    preferredProvider?: SortOrderInput | SortOrder
    referralSource?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    client?: ClientOrderByWithRelationInput
    visits?: VisitOrderByRelationAggregateInput
    appointments?: AppointmentOrderByRelationAggregateInput
  }

  export type PatientWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: PatientWhereInput | PatientWhereInput[]
    OR?: PatientWhereInput[]
    NOT?: PatientWhereInput | PatientWhereInput[]
    name?: StringFilter<"Patient"> | string
    species?: StringFilter<"Patient"> | string
    breed?: StringNullableFilter<"Patient"> | string | null
    sex?: StringNullableFilter<"Patient"> | string | null
    weight?: FloatNullableFilter<"Patient"> | number | null
    microchipNumber?: StringNullableFilter<"Patient"> | string | null
    color?: StringNullableFilter<"Patient"> | string | null
    birthDate?: DateTimeNullableFilter<"Patient"> | Date | string | null
    notes?: StringNullableFilter<"Patient"> | string | null
    clientId?: IntFilter<"Patient"> | number
    photoUrl?: StringNullableFilter<"Patient"> | string | null
    rabiesTag?: StringNullableFilter<"Patient"> | string | null
    preferredProvider?: StringNullableFilter<"Patient"> | string | null
    referralSource?: StringNullableFilter<"Patient"> | string | null
    createdAt?: DateTimeFilter<"Patient"> | Date | string
    updatedAt?: DateTimeFilter<"Patient"> | Date | string
    client?: XOR<ClientRelationFilter, ClientWhereInput>
    visits?: VisitListRelationFilter
    appointments?: AppointmentListRelationFilter
  }, "id">

  export type PatientOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    species?: SortOrder
    breed?: SortOrderInput | SortOrder
    sex?: SortOrderInput | SortOrder
    weight?: SortOrderInput | SortOrder
    microchipNumber?: SortOrderInput | SortOrder
    color?: SortOrderInput | SortOrder
    birthDate?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
    clientId?: SortOrder
    photoUrl?: SortOrderInput | SortOrder
    rabiesTag?: SortOrderInput | SortOrder
    preferredProvider?: SortOrderInput | SortOrder
    referralSource?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: PatientCountOrderByAggregateInput
    _avg?: PatientAvgOrderByAggregateInput
    _max?: PatientMaxOrderByAggregateInput
    _min?: PatientMinOrderByAggregateInput
    _sum?: PatientSumOrderByAggregateInput
  }

  export type PatientScalarWhereWithAggregatesInput = {
    AND?: PatientScalarWhereWithAggregatesInput | PatientScalarWhereWithAggregatesInput[]
    OR?: PatientScalarWhereWithAggregatesInput[]
    NOT?: PatientScalarWhereWithAggregatesInput | PatientScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Patient"> | number
    name?: StringWithAggregatesFilter<"Patient"> | string
    species?: StringWithAggregatesFilter<"Patient"> | string
    breed?: StringNullableWithAggregatesFilter<"Patient"> | string | null
    sex?: StringNullableWithAggregatesFilter<"Patient"> | string | null
    weight?: FloatNullableWithAggregatesFilter<"Patient"> | number | null
    microchipNumber?: StringNullableWithAggregatesFilter<"Patient"> | string | null
    color?: StringNullableWithAggregatesFilter<"Patient"> | string | null
    birthDate?: DateTimeNullableWithAggregatesFilter<"Patient"> | Date | string | null
    notes?: StringNullableWithAggregatesFilter<"Patient"> | string | null
    clientId?: IntWithAggregatesFilter<"Patient"> | number
    photoUrl?: StringNullableWithAggregatesFilter<"Patient"> | string | null
    rabiesTag?: StringNullableWithAggregatesFilter<"Patient"> | string | null
    preferredProvider?: StringNullableWithAggregatesFilter<"Patient"> | string | null
    referralSource?: StringNullableWithAggregatesFilter<"Patient"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Patient"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Patient"> | Date | string
  }

  export type VetWhereInput = {
    AND?: VetWhereInput | VetWhereInput[]
    OR?: VetWhereInput[]
    NOT?: VetWhereInput | VetWhereInput[]
    id?: IntFilter<"Vet"> | number
    name?: StringFilter<"Vet"> | string
    email?: StringFilter<"Vet"> | string
    createdAt?: DateTimeFilter<"Vet"> | Date | string
    updatedAt?: DateTimeFilter<"Vet"> | Date | string
    visits?: VisitListRelationFilter
  }

  export type VetOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    visits?: VisitOrderByRelationAggregateInput
  }

  export type VetWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    email?: string
    AND?: VetWhereInput | VetWhereInput[]
    OR?: VetWhereInput[]
    NOT?: VetWhereInput | VetWhereInput[]
    name?: StringFilter<"Vet"> | string
    createdAt?: DateTimeFilter<"Vet"> | Date | string
    updatedAt?: DateTimeFilter<"Vet"> | Date | string
    visits?: VisitListRelationFilter
  }, "id" | "email">

  export type VetOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: VetCountOrderByAggregateInput
    _avg?: VetAvgOrderByAggregateInput
    _max?: VetMaxOrderByAggregateInput
    _min?: VetMinOrderByAggregateInput
    _sum?: VetSumOrderByAggregateInput
  }

  export type VetScalarWhereWithAggregatesInput = {
    AND?: VetScalarWhereWithAggregatesInput | VetScalarWhereWithAggregatesInput[]
    OR?: VetScalarWhereWithAggregatesInput[]
    NOT?: VetScalarWhereWithAggregatesInput | VetScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Vet"> | number
    name?: StringWithAggregatesFilter<"Vet"> | string
    email?: StringWithAggregatesFilter<"Vet"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Vet"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Vet"> | Date | string
  }

  export type VisitWhereInput = {
    AND?: VisitWhereInput | VisitWhereInput[]
    OR?: VisitWhereInput[]
    NOT?: VisitWhereInput | VisitWhereInput[]
    id?: IntFilter<"Visit"> | number
    date?: DateTimeFilter<"Visit"> | Date | string
    notes?: StringFilter<"Visit"> | string
    patientId?: IntFilter<"Visit"> | number
    vetId?: IntFilter<"Visit"> | number
    createdAt?: DateTimeFilter<"Visit"> | Date | string
    updatedAt?: DateTimeFilter<"Visit"> | Date | string
    patient?: XOR<PatientRelationFilter, PatientWhereInput>
    vet?: XOR<VetRelationFilter, VetWhereInput>
  }

  export type VisitOrderByWithRelationInput = {
    id?: SortOrder
    date?: SortOrder
    notes?: SortOrder
    patientId?: SortOrder
    vetId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    patient?: PatientOrderByWithRelationInput
    vet?: VetOrderByWithRelationInput
  }

  export type VisitWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: VisitWhereInput | VisitWhereInput[]
    OR?: VisitWhereInput[]
    NOT?: VisitWhereInput | VisitWhereInput[]
    date?: DateTimeFilter<"Visit"> | Date | string
    notes?: StringFilter<"Visit"> | string
    patientId?: IntFilter<"Visit"> | number
    vetId?: IntFilter<"Visit"> | number
    createdAt?: DateTimeFilter<"Visit"> | Date | string
    updatedAt?: DateTimeFilter<"Visit"> | Date | string
    patient?: XOR<PatientRelationFilter, PatientWhereInput>
    vet?: XOR<VetRelationFilter, VetWhereInput>
  }, "id">

  export type VisitOrderByWithAggregationInput = {
    id?: SortOrder
    date?: SortOrder
    notes?: SortOrder
    patientId?: SortOrder
    vetId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: VisitCountOrderByAggregateInput
    _avg?: VisitAvgOrderByAggregateInput
    _max?: VisitMaxOrderByAggregateInput
    _min?: VisitMinOrderByAggregateInput
    _sum?: VisitSumOrderByAggregateInput
  }

  export type VisitScalarWhereWithAggregatesInput = {
    AND?: VisitScalarWhereWithAggregatesInput | VisitScalarWhereWithAggregatesInput[]
    OR?: VisitScalarWhereWithAggregatesInput[]
    NOT?: VisitScalarWhereWithAggregatesInput | VisitScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Visit"> | number
    date?: DateTimeWithAggregatesFilter<"Visit"> | Date | string
    notes?: StringWithAggregatesFilter<"Visit"> | string
    patientId?: IntWithAggregatesFilter<"Visit"> | number
    vetId?: IntWithAggregatesFilter<"Visit"> | number
    createdAt?: DateTimeWithAggregatesFilter<"Visit"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Visit"> | Date | string
  }

  export type AppointmentWhereInput = {
    AND?: AppointmentWhereInput | AppointmentWhereInput[]
    OR?: AppointmentWhereInput[]
    NOT?: AppointmentWhereInput | AppointmentWhereInput[]
    id?: IntFilter<"Appointment"> | number
    startTime?: DateTimeFilter<"Appointment"> | Date | string
    endTime?: DateTimeFilter<"Appointment"> | Date | string
    description?: StringNullableFilter<"Appointment"> | string | null
    status?: StringFilter<"Appointment"> | string
    clientId?: IntFilter<"Appointment"> | number
    patientId?: IntFilter<"Appointment"> | number
    createdAt?: DateTimeFilter<"Appointment"> | Date | string
    updatedAt?: DateTimeFilter<"Appointment"> | Date | string
    client?: XOR<ClientRelationFilter, ClientWhereInput>
    patient?: XOR<PatientRelationFilter, PatientWhereInput>
  }

  export type AppointmentOrderByWithRelationInput = {
    id?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    description?: SortOrderInput | SortOrder
    status?: SortOrder
    clientId?: SortOrder
    patientId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    client?: ClientOrderByWithRelationInput
    patient?: PatientOrderByWithRelationInput
  }

  export type AppointmentWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: AppointmentWhereInput | AppointmentWhereInput[]
    OR?: AppointmentWhereInput[]
    NOT?: AppointmentWhereInput | AppointmentWhereInput[]
    startTime?: DateTimeFilter<"Appointment"> | Date | string
    endTime?: DateTimeFilter<"Appointment"> | Date | string
    description?: StringNullableFilter<"Appointment"> | string | null
    status?: StringFilter<"Appointment"> | string
    clientId?: IntFilter<"Appointment"> | number
    patientId?: IntFilter<"Appointment"> | number
    createdAt?: DateTimeFilter<"Appointment"> | Date | string
    updatedAt?: DateTimeFilter<"Appointment"> | Date | string
    client?: XOR<ClientRelationFilter, ClientWhereInput>
    patient?: XOR<PatientRelationFilter, PatientWhereInput>
  }, "id">

  export type AppointmentOrderByWithAggregationInput = {
    id?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    description?: SortOrderInput | SortOrder
    status?: SortOrder
    clientId?: SortOrder
    patientId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: AppointmentCountOrderByAggregateInput
    _avg?: AppointmentAvgOrderByAggregateInput
    _max?: AppointmentMaxOrderByAggregateInput
    _min?: AppointmentMinOrderByAggregateInput
    _sum?: AppointmentSumOrderByAggregateInput
  }

  export type AppointmentScalarWhereWithAggregatesInput = {
    AND?: AppointmentScalarWhereWithAggregatesInput | AppointmentScalarWhereWithAggregatesInput[]
    OR?: AppointmentScalarWhereWithAggregatesInput[]
    NOT?: AppointmentScalarWhereWithAggregatesInput | AppointmentScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Appointment"> | number
    startTime?: DateTimeWithAggregatesFilter<"Appointment"> | Date | string
    endTime?: DateTimeWithAggregatesFilter<"Appointment"> | Date | string
    description?: StringNullableWithAggregatesFilter<"Appointment"> | string | null
    status?: StringWithAggregatesFilter<"Appointment"> | string
    clientId?: IntWithAggregatesFilter<"Appointment"> | number
    patientId?: IntWithAggregatesFilter<"Appointment"> | number
    createdAt?: DateTimeWithAggregatesFilter<"Appointment"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Appointment"> | Date | string
  }

  export type ClinicConfigWhereInput = {
    AND?: ClinicConfigWhereInput | ClinicConfigWhereInput[]
    OR?: ClinicConfigWhereInput[]
    NOT?: ClinicConfigWhereInput | ClinicConfigWhereInput[]
    id?: IntFilter<"ClinicConfig"> | number
    name?: StringFilter<"ClinicConfig"> | string
    logoUrl?: StringNullableFilter<"ClinicConfig"> | string | null
    email?: StringNullableFilter<"ClinicConfig"> | string | null
    phone?: StringNullableFilter<"ClinicConfig"> | string | null
    address?: StringNullableFilter<"ClinicConfig"> | string | null
    units?: StringFilter<"ClinicConfig"> | string
    dateFormat?: StringFilter<"ClinicConfig"> | string
    hoursOfOperation?: StringNullableFilter<"ClinicConfig"> | string | null
    websiteUrl?: StringNullableFilter<"ClinicConfig"> | string | null
    taxRate?: FloatFilter<"ClinicConfig"> | number
    createdAt?: DateTimeFilter<"ClinicConfig"> | Date | string
    updatedAt?: DateTimeFilter<"ClinicConfig"> | Date | string
  }

  export type ClinicConfigOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    logoUrl?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    phone?: SortOrderInput | SortOrder
    address?: SortOrderInput | SortOrder
    units?: SortOrder
    dateFormat?: SortOrder
    hoursOfOperation?: SortOrderInput | SortOrder
    websiteUrl?: SortOrderInput | SortOrder
    taxRate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ClinicConfigWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: ClinicConfigWhereInput | ClinicConfigWhereInput[]
    OR?: ClinicConfigWhereInput[]
    NOT?: ClinicConfigWhereInput | ClinicConfigWhereInput[]
    name?: StringFilter<"ClinicConfig"> | string
    logoUrl?: StringNullableFilter<"ClinicConfig"> | string | null
    email?: StringNullableFilter<"ClinicConfig"> | string | null
    phone?: StringNullableFilter<"ClinicConfig"> | string | null
    address?: StringNullableFilter<"ClinicConfig"> | string | null
    units?: StringFilter<"ClinicConfig"> | string
    dateFormat?: StringFilter<"ClinicConfig"> | string
    hoursOfOperation?: StringNullableFilter<"ClinicConfig"> | string | null
    websiteUrl?: StringNullableFilter<"ClinicConfig"> | string | null
    taxRate?: FloatFilter<"ClinicConfig"> | number
    createdAt?: DateTimeFilter<"ClinicConfig"> | Date | string
    updatedAt?: DateTimeFilter<"ClinicConfig"> | Date | string
  }, "id">

  export type ClinicConfigOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    logoUrl?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    phone?: SortOrderInput | SortOrder
    address?: SortOrderInput | SortOrder
    units?: SortOrder
    dateFormat?: SortOrder
    hoursOfOperation?: SortOrderInput | SortOrder
    websiteUrl?: SortOrderInput | SortOrder
    taxRate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ClinicConfigCountOrderByAggregateInput
    _avg?: ClinicConfigAvgOrderByAggregateInput
    _max?: ClinicConfigMaxOrderByAggregateInput
    _min?: ClinicConfigMinOrderByAggregateInput
    _sum?: ClinicConfigSumOrderByAggregateInput
  }

  export type ClinicConfigScalarWhereWithAggregatesInput = {
    AND?: ClinicConfigScalarWhereWithAggregatesInput | ClinicConfigScalarWhereWithAggregatesInput[]
    OR?: ClinicConfigScalarWhereWithAggregatesInput[]
    NOT?: ClinicConfigScalarWhereWithAggregatesInput | ClinicConfigScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"ClinicConfig"> | number
    name?: StringWithAggregatesFilter<"ClinicConfig"> | string
    logoUrl?: StringNullableWithAggregatesFilter<"ClinicConfig"> | string | null
    email?: StringNullableWithAggregatesFilter<"ClinicConfig"> | string | null
    phone?: StringNullableWithAggregatesFilter<"ClinicConfig"> | string | null
    address?: StringNullableWithAggregatesFilter<"ClinicConfig"> | string | null
    units?: StringWithAggregatesFilter<"ClinicConfig"> | string
    dateFormat?: StringWithAggregatesFilter<"ClinicConfig"> | string
    hoursOfOperation?: StringNullableWithAggregatesFilter<"ClinicConfig"> | string | null
    websiteUrl?: StringNullableWithAggregatesFilter<"ClinicConfig"> | string | null
    taxRate?: FloatWithAggregatesFilter<"ClinicConfig"> | number
    createdAt?: DateTimeWithAggregatesFilter<"ClinicConfig"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"ClinicConfig"> | Date | string
  }

  export type ClientCreateInput = {
    firstName: string
    lastName: string
    email?: string | null
    phone?: string | null
    secondaryPhone?: string | null
    address?: string | null
    emergencyContactName?: string | null
    emergencyContactPhone?: string | null
    notes?: string | null
    dob?: Date | string | null
    gender?: string | null
    driverLicenseState?: string | null
    driverLicenseNumber?: string | null
    driverLicenseExp?: string | null
    clientType?: string | null
    active?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    pets?: PatientCreateNestedManyWithoutClientInput
    appointments?: AppointmentCreateNestedManyWithoutClientInput
  }

  export type ClientUncheckedCreateInput = {
    id?: number
    firstName: string
    lastName: string
    email?: string | null
    phone?: string | null
    secondaryPhone?: string | null
    address?: string | null
    emergencyContactName?: string | null
    emergencyContactPhone?: string | null
    notes?: string | null
    dob?: Date | string | null
    gender?: string | null
    driverLicenseState?: string | null
    driverLicenseNumber?: string | null
    driverLicenseExp?: string | null
    clientType?: string | null
    active?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    pets?: PatientUncheckedCreateNestedManyWithoutClientInput
    appointments?: AppointmentUncheckedCreateNestedManyWithoutClientInput
  }

  export type ClientUpdateInput = {
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    secondaryPhone?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    emergencyContactName?: NullableStringFieldUpdateOperationsInput | string | null
    emergencyContactPhone?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    dob?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    driverLicenseState?: NullableStringFieldUpdateOperationsInput | string | null
    driverLicenseNumber?: NullableStringFieldUpdateOperationsInput | string | null
    driverLicenseExp?: NullableStringFieldUpdateOperationsInput | string | null
    clientType?: NullableStringFieldUpdateOperationsInput | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    pets?: PatientUpdateManyWithoutClientNestedInput
    appointments?: AppointmentUpdateManyWithoutClientNestedInput
  }

  export type ClientUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    secondaryPhone?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    emergencyContactName?: NullableStringFieldUpdateOperationsInput | string | null
    emergencyContactPhone?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    dob?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    driverLicenseState?: NullableStringFieldUpdateOperationsInput | string | null
    driverLicenseNumber?: NullableStringFieldUpdateOperationsInput | string | null
    driverLicenseExp?: NullableStringFieldUpdateOperationsInput | string | null
    clientType?: NullableStringFieldUpdateOperationsInput | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    pets?: PatientUncheckedUpdateManyWithoutClientNestedInput
    appointments?: AppointmentUncheckedUpdateManyWithoutClientNestedInput
  }

  export type ClientCreateManyInput = {
    id?: number
    firstName: string
    lastName: string
    email?: string | null
    phone?: string | null
    secondaryPhone?: string | null
    address?: string | null
    emergencyContactName?: string | null
    emergencyContactPhone?: string | null
    notes?: string | null
    dob?: Date | string | null
    gender?: string | null
    driverLicenseState?: string | null
    driverLicenseNumber?: string | null
    driverLicenseExp?: string | null
    clientType?: string | null
    active?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ClientUpdateManyMutationInput = {
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    secondaryPhone?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    emergencyContactName?: NullableStringFieldUpdateOperationsInput | string | null
    emergencyContactPhone?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    dob?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    driverLicenseState?: NullableStringFieldUpdateOperationsInput | string | null
    driverLicenseNumber?: NullableStringFieldUpdateOperationsInput | string | null
    driverLicenseExp?: NullableStringFieldUpdateOperationsInput | string | null
    clientType?: NullableStringFieldUpdateOperationsInput | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClientUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    secondaryPhone?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    emergencyContactName?: NullableStringFieldUpdateOperationsInput | string | null
    emergencyContactPhone?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    dob?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    driverLicenseState?: NullableStringFieldUpdateOperationsInput | string | null
    driverLicenseNumber?: NullableStringFieldUpdateOperationsInput | string | null
    driverLicenseExp?: NullableStringFieldUpdateOperationsInput | string | null
    clientType?: NullableStringFieldUpdateOperationsInput | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PatientCreateInput = {
    name: string
    species: string
    breed?: string | null
    sex?: string | null
    weight?: number | null
    microchipNumber?: string | null
    color?: string | null
    birthDate?: Date | string | null
    notes?: string | null
    photoUrl?: string | null
    rabiesTag?: string | null
    preferredProvider?: string | null
    referralSource?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    client: ClientCreateNestedOneWithoutPetsInput
    visits?: VisitCreateNestedManyWithoutPatientInput
    appointments?: AppointmentCreateNestedManyWithoutPatientInput
  }

  export type PatientUncheckedCreateInput = {
    id?: number
    name: string
    species: string
    breed?: string | null
    sex?: string | null
    weight?: number | null
    microchipNumber?: string | null
    color?: string | null
    birthDate?: Date | string | null
    notes?: string | null
    clientId: number
    photoUrl?: string | null
    rabiesTag?: string | null
    preferredProvider?: string | null
    referralSource?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    visits?: VisitUncheckedCreateNestedManyWithoutPatientInput
    appointments?: AppointmentUncheckedCreateNestedManyWithoutPatientInput
  }

  export type PatientUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    species?: StringFieldUpdateOperationsInput | string
    breed?: NullableStringFieldUpdateOperationsInput | string | null
    sex?: NullableStringFieldUpdateOperationsInput | string | null
    weight?: NullableFloatFieldUpdateOperationsInput | number | null
    microchipNumber?: NullableStringFieldUpdateOperationsInput | string | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
    birthDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    rabiesTag?: NullableStringFieldUpdateOperationsInput | string | null
    preferredProvider?: NullableStringFieldUpdateOperationsInput | string | null
    referralSource?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    client?: ClientUpdateOneRequiredWithoutPetsNestedInput
    visits?: VisitUpdateManyWithoutPatientNestedInput
    appointments?: AppointmentUpdateManyWithoutPatientNestedInput
  }

  export type PatientUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    species?: StringFieldUpdateOperationsInput | string
    breed?: NullableStringFieldUpdateOperationsInput | string | null
    sex?: NullableStringFieldUpdateOperationsInput | string | null
    weight?: NullableFloatFieldUpdateOperationsInput | number | null
    microchipNumber?: NullableStringFieldUpdateOperationsInput | string | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
    birthDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    clientId?: IntFieldUpdateOperationsInput | number
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    rabiesTag?: NullableStringFieldUpdateOperationsInput | string | null
    preferredProvider?: NullableStringFieldUpdateOperationsInput | string | null
    referralSource?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    visits?: VisitUncheckedUpdateManyWithoutPatientNestedInput
    appointments?: AppointmentUncheckedUpdateManyWithoutPatientNestedInput
  }

  export type PatientCreateManyInput = {
    id?: number
    name: string
    species: string
    breed?: string | null
    sex?: string | null
    weight?: number | null
    microchipNumber?: string | null
    color?: string | null
    birthDate?: Date | string | null
    notes?: string | null
    clientId: number
    photoUrl?: string | null
    rabiesTag?: string | null
    preferredProvider?: string | null
    referralSource?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PatientUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    species?: StringFieldUpdateOperationsInput | string
    breed?: NullableStringFieldUpdateOperationsInput | string | null
    sex?: NullableStringFieldUpdateOperationsInput | string | null
    weight?: NullableFloatFieldUpdateOperationsInput | number | null
    microchipNumber?: NullableStringFieldUpdateOperationsInput | string | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
    birthDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    rabiesTag?: NullableStringFieldUpdateOperationsInput | string | null
    preferredProvider?: NullableStringFieldUpdateOperationsInput | string | null
    referralSource?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PatientUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    species?: StringFieldUpdateOperationsInput | string
    breed?: NullableStringFieldUpdateOperationsInput | string | null
    sex?: NullableStringFieldUpdateOperationsInput | string | null
    weight?: NullableFloatFieldUpdateOperationsInput | number | null
    microchipNumber?: NullableStringFieldUpdateOperationsInput | string | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
    birthDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    clientId?: IntFieldUpdateOperationsInput | number
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    rabiesTag?: NullableStringFieldUpdateOperationsInput | string | null
    preferredProvider?: NullableStringFieldUpdateOperationsInput | string | null
    referralSource?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VetCreateInput = {
    name: string
    email: string
    createdAt?: Date | string
    updatedAt?: Date | string
    visits?: VisitCreateNestedManyWithoutVetInput
  }

  export type VetUncheckedCreateInput = {
    id?: number
    name: string
    email: string
    createdAt?: Date | string
    updatedAt?: Date | string
    visits?: VisitUncheckedCreateNestedManyWithoutVetInput
  }

  export type VetUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    visits?: VisitUpdateManyWithoutVetNestedInput
  }

  export type VetUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    visits?: VisitUncheckedUpdateManyWithoutVetNestedInput
  }

  export type VetCreateManyInput = {
    id?: number
    name: string
    email: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type VetUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VetUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VisitCreateInput = {
    date?: Date | string
    notes: string
    createdAt?: Date | string
    updatedAt?: Date | string
    patient: PatientCreateNestedOneWithoutVisitsInput
    vet: VetCreateNestedOneWithoutVisitsInput
  }

  export type VisitUncheckedCreateInput = {
    id?: number
    date?: Date | string
    notes: string
    patientId: number
    vetId: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type VisitUpdateInput = {
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    patient?: PatientUpdateOneRequiredWithoutVisitsNestedInput
    vet?: VetUpdateOneRequiredWithoutVisitsNestedInput
  }

  export type VisitUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: StringFieldUpdateOperationsInput | string
    patientId?: IntFieldUpdateOperationsInput | number
    vetId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VisitCreateManyInput = {
    id?: number
    date?: Date | string
    notes: string
    patientId: number
    vetId: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type VisitUpdateManyMutationInput = {
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VisitUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: StringFieldUpdateOperationsInput | string
    patientId?: IntFieldUpdateOperationsInput | number
    vetId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AppointmentCreateInput = {
    startTime: Date | string
    endTime: Date | string
    description?: string | null
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    client: ClientCreateNestedOneWithoutAppointmentsInput
    patient: PatientCreateNestedOneWithoutAppointmentsInput
  }

  export type AppointmentUncheckedCreateInput = {
    id?: number
    startTime: Date | string
    endTime: Date | string
    description?: string | null
    status?: string
    clientId: number
    patientId: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AppointmentUpdateInput = {
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    client?: ClientUpdateOneRequiredWithoutAppointmentsNestedInput
    patient?: PatientUpdateOneRequiredWithoutAppointmentsNestedInput
  }

  export type AppointmentUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    clientId?: IntFieldUpdateOperationsInput | number
    patientId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AppointmentCreateManyInput = {
    id?: number
    startTime: Date | string
    endTime: Date | string
    description?: string | null
    status?: string
    clientId: number
    patientId: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AppointmentUpdateManyMutationInput = {
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AppointmentUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    clientId?: IntFieldUpdateOperationsInput | number
    patientId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClinicConfigCreateInput = {
    id?: number
    name?: string
    logoUrl?: string | null
    email?: string | null
    phone?: string | null
    address?: string | null
    units?: string
    dateFormat?: string
    hoursOfOperation?: string | null
    websiteUrl?: string | null
    taxRate?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ClinicConfigUncheckedCreateInput = {
    id?: number
    name?: string
    logoUrl?: string | null
    email?: string | null
    phone?: string | null
    address?: string | null
    units?: string
    dateFormat?: string
    hoursOfOperation?: string | null
    websiteUrl?: string | null
    taxRate?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ClinicConfigUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    units?: StringFieldUpdateOperationsInput | string
    dateFormat?: StringFieldUpdateOperationsInput | string
    hoursOfOperation?: NullableStringFieldUpdateOperationsInput | string | null
    websiteUrl?: NullableStringFieldUpdateOperationsInput | string | null
    taxRate?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClinicConfigUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    units?: StringFieldUpdateOperationsInput | string
    dateFormat?: StringFieldUpdateOperationsInput | string
    hoursOfOperation?: NullableStringFieldUpdateOperationsInput | string | null
    websiteUrl?: NullableStringFieldUpdateOperationsInput | string | null
    taxRate?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClinicConfigCreateManyInput = {
    id?: number
    name?: string
    logoUrl?: string | null
    email?: string | null
    phone?: string | null
    address?: string | null
    units?: string
    dateFormat?: string
    hoursOfOperation?: string | null
    websiteUrl?: string | null
    taxRate?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ClinicConfigUpdateManyMutationInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    units?: StringFieldUpdateOperationsInput | string
    dateFormat?: StringFieldUpdateOperationsInput | string
    hoursOfOperation?: NullableStringFieldUpdateOperationsInput | string | null
    websiteUrl?: NullableStringFieldUpdateOperationsInput | string | null
    taxRate?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClinicConfigUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    units?: StringFieldUpdateOperationsInput | string
    dateFormat?: StringFieldUpdateOperationsInput | string
    hoursOfOperation?: NullableStringFieldUpdateOperationsInput | string | null
    websiteUrl?: NullableStringFieldUpdateOperationsInput | string | null
    taxRate?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type PatientListRelationFilter = {
    every?: PatientWhereInput
    some?: PatientWhereInput
    none?: PatientWhereInput
  }

  export type AppointmentListRelationFilter = {
    every?: AppointmentWhereInput
    some?: AppointmentWhereInput
    none?: AppointmentWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type PatientOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AppointmentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ClientCountOrderByAggregateInput = {
    id?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    secondaryPhone?: SortOrder
    address?: SortOrder
    emergencyContactName?: SortOrder
    emergencyContactPhone?: SortOrder
    notes?: SortOrder
    dob?: SortOrder
    gender?: SortOrder
    driverLicenseState?: SortOrder
    driverLicenseNumber?: SortOrder
    driverLicenseExp?: SortOrder
    clientType?: SortOrder
    active?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ClientAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type ClientMaxOrderByAggregateInput = {
    id?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    secondaryPhone?: SortOrder
    address?: SortOrder
    emergencyContactName?: SortOrder
    emergencyContactPhone?: SortOrder
    notes?: SortOrder
    dob?: SortOrder
    gender?: SortOrder
    driverLicenseState?: SortOrder
    driverLicenseNumber?: SortOrder
    driverLicenseExp?: SortOrder
    clientType?: SortOrder
    active?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ClientMinOrderByAggregateInput = {
    id?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    secondaryPhone?: SortOrder
    address?: SortOrder
    emergencyContactName?: SortOrder
    emergencyContactPhone?: SortOrder
    notes?: SortOrder
    dob?: SortOrder
    gender?: SortOrder
    driverLicenseState?: SortOrder
    driverLicenseNumber?: SortOrder
    driverLicenseExp?: SortOrder
    clientType?: SortOrder
    active?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ClientSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type ClientRelationFilter = {
    is?: ClientWhereInput
    isNot?: ClientWhereInput
  }

  export type VisitListRelationFilter = {
    every?: VisitWhereInput
    some?: VisitWhereInput
    none?: VisitWhereInput
  }

  export type VisitOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PatientCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    species?: SortOrder
    breed?: SortOrder
    sex?: SortOrder
    weight?: SortOrder
    microchipNumber?: SortOrder
    color?: SortOrder
    birthDate?: SortOrder
    notes?: SortOrder
    clientId?: SortOrder
    photoUrl?: SortOrder
    rabiesTag?: SortOrder
    preferredProvider?: SortOrder
    referralSource?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PatientAvgOrderByAggregateInput = {
    id?: SortOrder
    weight?: SortOrder
    clientId?: SortOrder
  }

  export type PatientMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    species?: SortOrder
    breed?: SortOrder
    sex?: SortOrder
    weight?: SortOrder
    microchipNumber?: SortOrder
    color?: SortOrder
    birthDate?: SortOrder
    notes?: SortOrder
    clientId?: SortOrder
    photoUrl?: SortOrder
    rabiesTag?: SortOrder
    preferredProvider?: SortOrder
    referralSource?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PatientMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    species?: SortOrder
    breed?: SortOrder
    sex?: SortOrder
    weight?: SortOrder
    microchipNumber?: SortOrder
    color?: SortOrder
    birthDate?: SortOrder
    notes?: SortOrder
    clientId?: SortOrder
    photoUrl?: SortOrder
    rabiesTag?: SortOrder
    preferredProvider?: SortOrder
    referralSource?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PatientSumOrderByAggregateInput = {
    id?: SortOrder
    weight?: SortOrder
    clientId?: SortOrder
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type VetCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type VetAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type VetMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type VetMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type VetSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type PatientRelationFilter = {
    is?: PatientWhereInput
    isNot?: PatientWhereInput
  }

  export type VetRelationFilter = {
    is?: VetWhereInput
    isNot?: VetWhereInput
  }

  export type VisitCountOrderByAggregateInput = {
    id?: SortOrder
    date?: SortOrder
    notes?: SortOrder
    patientId?: SortOrder
    vetId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type VisitAvgOrderByAggregateInput = {
    id?: SortOrder
    patientId?: SortOrder
    vetId?: SortOrder
  }

  export type VisitMaxOrderByAggregateInput = {
    id?: SortOrder
    date?: SortOrder
    notes?: SortOrder
    patientId?: SortOrder
    vetId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type VisitMinOrderByAggregateInput = {
    id?: SortOrder
    date?: SortOrder
    notes?: SortOrder
    patientId?: SortOrder
    vetId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type VisitSumOrderByAggregateInput = {
    id?: SortOrder
    patientId?: SortOrder
    vetId?: SortOrder
  }

  export type AppointmentCountOrderByAggregateInput = {
    id?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    description?: SortOrder
    status?: SortOrder
    clientId?: SortOrder
    patientId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AppointmentAvgOrderByAggregateInput = {
    id?: SortOrder
    clientId?: SortOrder
    patientId?: SortOrder
  }

  export type AppointmentMaxOrderByAggregateInput = {
    id?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    description?: SortOrder
    status?: SortOrder
    clientId?: SortOrder
    patientId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AppointmentMinOrderByAggregateInput = {
    id?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    description?: SortOrder
    status?: SortOrder
    clientId?: SortOrder
    patientId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AppointmentSumOrderByAggregateInput = {
    id?: SortOrder
    clientId?: SortOrder
    patientId?: SortOrder
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type ClinicConfigCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    logoUrl?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    address?: SortOrder
    units?: SortOrder
    dateFormat?: SortOrder
    hoursOfOperation?: SortOrder
    websiteUrl?: SortOrder
    taxRate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ClinicConfigAvgOrderByAggregateInput = {
    id?: SortOrder
    taxRate?: SortOrder
  }

  export type ClinicConfigMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    logoUrl?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    address?: SortOrder
    units?: SortOrder
    dateFormat?: SortOrder
    hoursOfOperation?: SortOrder
    websiteUrl?: SortOrder
    taxRate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ClinicConfigMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    logoUrl?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    address?: SortOrder
    units?: SortOrder
    dateFormat?: SortOrder
    hoursOfOperation?: SortOrder
    websiteUrl?: SortOrder
    taxRate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ClinicConfigSumOrderByAggregateInput = {
    id?: SortOrder
    taxRate?: SortOrder
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type PatientCreateNestedManyWithoutClientInput = {
    create?: XOR<PatientCreateWithoutClientInput, PatientUncheckedCreateWithoutClientInput> | PatientCreateWithoutClientInput[] | PatientUncheckedCreateWithoutClientInput[]
    connectOrCreate?: PatientCreateOrConnectWithoutClientInput | PatientCreateOrConnectWithoutClientInput[]
    createMany?: PatientCreateManyClientInputEnvelope
    connect?: PatientWhereUniqueInput | PatientWhereUniqueInput[]
  }

  export type AppointmentCreateNestedManyWithoutClientInput = {
    create?: XOR<AppointmentCreateWithoutClientInput, AppointmentUncheckedCreateWithoutClientInput> | AppointmentCreateWithoutClientInput[] | AppointmentUncheckedCreateWithoutClientInput[]
    connectOrCreate?: AppointmentCreateOrConnectWithoutClientInput | AppointmentCreateOrConnectWithoutClientInput[]
    createMany?: AppointmentCreateManyClientInputEnvelope
    connect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
  }

  export type PatientUncheckedCreateNestedManyWithoutClientInput = {
    create?: XOR<PatientCreateWithoutClientInput, PatientUncheckedCreateWithoutClientInput> | PatientCreateWithoutClientInput[] | PatientUncheckedCreateWithoutClientInput[]
    connectOrCreate?: PatientCreateOrConnectWithoutClientInput | PatientCreateOrConnectWithoutClientInput[]
    createMany?: PatientCreateManyClientInputEnvelope
    connect?: PatientWhereUniqueInput | PatientWhereUniqueInput[]
  }

  export type AppointmentUncheckedCreateNestedManyWithoutClientInput = {
    create?: XOR<AppointmentCreateWithoutClientInput, AppointmentUncheckedCreateWithoutClientInput> | AppointmentCreateWithoutClientInput[] | AppointmentUncheckedCreateWithoutClientInput[]
    connectOrCreate?: AppointmentCreateOrConnectWithoutClientInput | AppointmentCreateOrConnectWithoutClientInput[]
    createMany?: AppointmentCreateManyClientInputEnvelope
    connect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type PatientUpdateManyWithoutClientNestedInput = {
    create?: XOR<PatientCreateWithoutClientInput, PatientUncheckedCreateWithoutClientInput> | PatientCreateWithoutClientInput[] | PatientUncheckedCreateWithoutClientInput[]
    connectOrCreate?: PatientCreateOrConnectWithoutClientInput | PatientCreateOrConnectWithoutClientInput[]
    upsert?: PatientUpsertWithWhereUniqueWithoutClientInput | PatientUpsertWithWhereUniqueWithoutClientInput[]
    createMany?: PatientCreateManyClientInputEnvelope
    set?: PatientWhereUniqueInput | PatientWhereUniqueInput[]
    disconnect?: PatientWhereUniqueInput | PatientWhereUniqueInput[]
    delete?: PatientWhereUniqueInput | PatientWhereUniqueInput[]
    connect?: PatientWhereUniqueInput | PatientWhereUniqueInput[]
    update?: PatientUpdateWithWhereUniqueWithoutClientInput | PatientUpdateWithWhereUniqueWithoutClientInput[]
    updateMany?: PatientUpdateManyWithWhereWithoutClientInput | PatientUpdateManyWithWhereWithoutClientInput[]
    deleteMany?: PatientScalarWhereInput | PatientScalarWhereInput[]
  }

  export type AppointmentUpdateManyWithoutClientNestedInput = {
    create?: XOR<AppointmentCreateWithoutClientInput, AppointmentUncheckedCreateWithoutClientInput> | AppointmentCreateWithoutClientInput[] | AppointmentUncheckedCreateWithoutClientInput[]
    connectOrCreate?: AppointmentCreateOrConnectWithoutClientInput | AppointmentCreateOrConnectWithoutClientInput[]
    upsert?: AppointmentUpsertWithWhereUniqueWithoutClientInput | AppointmentUpsertWithWhereUniqueWithoutClientInput[]
    createMany?: AppointmentCreateManyClientInputEnvelope
    set?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    disconnect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    delete?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    connect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    update?: AppointmentUpdateWithWhereUniqueWithoutClientInput | AppointmentUpdateWithWhereUniqueWithoutClientInput[]
    updateMany?: AppointmentUpdateManyWithWhereWithoutClientInput | AppointmentUpdateManyWithWhereWithoutClientInput[]
    deleteMany?: AppointmentScalarWhereInput | AppointmentScalarWhereInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type PatientUncheckedUpdateManyWithoutClientNestedInput = {
    create?: XOR<PatientCreateWithoutClientInput, PatientUncheckedCreateWithoutClientInput> | PatientCreateWithoutClientInput[] | PatientUncheckedCreateWithoutClientInput[]
    connectOrCreate?: PatientCreateOrConnectWithoutClientInput | PatientCreateOrConnectWithoutClientInput[]
    upsert?: PatientUpsertWithWhereUniqueWithoutClientInput | PatientUpsertWithWhereUniqueWithoutClientInput[]
    createMany?: PatientCreateManyClientInputEnvelope
    set?: PatientWhereUniqueInput | PatientWhereUniqueInput[]
    disconnect?: PatientWhereUniqueInput | PatientWhereUniqueInput[]
    delete?: PatientWhereUniqueInput | PatientWhereUniqueInput[]
    connect?: PatientWhereUniqueInput | PatientWhereUniqueInput[]
    update?: PatientUpdateWithWhereUniqueWithoutClientInput | PatientUpdateWithWhereUniqueWithoutClientInput[]
    updateMany?: PatientUpdateManyWithWhereWithoutClientInput | PatientUpdateManyWithWhereWithoutClientInput[]
    deleteMany?: PatientScalarWhereInput | PatientScalarWhereInput[]
  }

  export type AppointmentUncheckedUpdateManyWithoutClientNestedInput = {
    create?: XOR<AppointmentCreateWithoutClientInput, AppointmentUncheckedCreateWithoutClientInput> | AppointmentCreateWithoutClientInput[] | AppointmentUncheckedCreateWithoutClientInput[]
    connectOrCreate?: AppointmentCreateOrConnectWithoutClientInput | AppointmentCreateOrConnectWithoutClientInput[]
    upsert?: AppointmentUpsertWithWhereUniqueWithoutClientInput | AppointmentUpsertWithWhereUniqueWithoutClientInput[]
    createMany?: AppointmentCreateManyClientInputEnvelope
    set?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    disconnect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    delete?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    connect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    update?: AppointmentUpdateWithWhereUniqueWithoutClientInput | AppointmentUpdateWithWhereUniqueWithoutClientInput[]
    updateMany?: AppointmentUpdateManyWithWhereWithoutClientInput | AppointmentUpdateManyWithWhereWithoutClientInput[]
    deleteMany?: AppointmentScalarWhereInput | AppointmentScalarWhereInput[]
  }

  export type ClientCreateNestedOneWithoutPetsInput = {
    create?: XOR<ClientCreateWithoutPetsInput, ClientUncheckedCreateWithoutPetsInput>
    connectOrCreate?: ClientCreateOrConnectWithoutPetsInput
    connect?: ClientWhereUniqueInput
  }

  export type VisitCreateNestedManyWithoutPatientInput = {
    create?: XOR<VisitCreateWithoutPatientInput, VisitUncheckedCreateWithoutPatientInput> | VisitCreateWithoutPatientInput[] | VisitUncheckedCreateWithoutPatientInput[]
    connectOrCreate?: VisitCreateOrConnectWithoutPatientInput | VisitCreateOrConnectWithoutPatientInput[]
    createMany?: VisitCreateManyPatientInputEnvelope
    connect?: VisitWhereUniqueInput | VisitWhereUniqueInput[]
  }

  export type AppointmentCreateNestedManyWithoutPatientInput = {
    create?: XOR<AppointmentCreateWithoutPatientInput, AppointmentUncheckedCreateWithoutPatientInput> | AppointmentCreateWithoutPatientInput[] | AppointmentUncheckedCreateWithoutPatientInput[]
    connectOrCreate?: AppointmentCreateOrConnectWithoutPatientInput | AppointmentCreateOrConnectWithoutPatientInput[]
    createMany?: AppointmentCreateManyPatientInputEnvelope
    connect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
  }

  export type VisitUncheckedCreateNestedManyWithoutPatientInput = {
    create?: XOR<VisitCreateWithoutPatientInput, VisitUncheckedCreateWithoutPatientInput> | VisitCreateWithoutPatientInput[] | VisitUncheckedCreateWithoutPatientInput[]
    connectOrCreate?: VisitCreateOrConnectWithoutPatientInput | VisitCreateOrConnectWithoutPatientInput[]
    createMany?: VisitCreateManyPatientInputEnvelope
    connect?: VisitWhereUniqueInput | VisitWhereUniqueInput[]
  }

  export type AppointmentUncheckedCreateNestedManyWithoutPatientInput = {
    create?: XOR<AppointmentCreateWithoutPatientInput, AppointmentUncheckedCreateWithoutPatientInput> | AppointmentCreateWithoutPatientInput[] | AppointmentUncheckedCreateWithoutPatientInput[]
    connectOrCreate?: AppointmentCreateOrConnectWithoutPatientInput | AppointmentCreateOrConnectWithoutPatientInput[]
    createMany?: AppointmentCreateManyPatientInputEnvelope
    connect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type ClientUpdateOneRequiredWithoutPetsNestedInput = {
    create?: XOR<ClientCreateWithoutPetsInput, ClientUncheckedCreateWithoutPetsInput>
    connectOrCreate?: ClientCreateOrConnectWithoutPetsInput
    upsert?: ClientUpsertWithoutPetsInput
    connect?: ClientWhereUniqueInput
    update?: XOR<XOR<ClientUpdateToOneWithWhereWithoutPetsInput, ClientUpdateWithoutPetsInput>, ClientUncheckedUpdateWithoutPetsInput>
  }

  export type VisitUpdateManyWithoutPatientNestedInput = {
    create?: XOR<VisitCreateWithoutPatientInput, VisitUncheckedCreateWithoutPatientInput> | VisitCreateWithoutPatientInput[] | VisitUncheckedCreateWithoutPatientInput[]
    connectOrCreate?: VisitCreateOrConnectWithoutPatientInput | VisitCreateOrConnectWithoutPatientInput[]
    upsert?: VisitUpsertWithWhereUniqueWithoutPatientInput | VisitUpsertWithWhereUniqueWithoutPatientInput[]
    createMany?: VisitCreateManyPatientInputEnvelope
    set?: VisitWhereUniqueInput | VisitWhereUniqueInput[]
    disconnect?: VisitWhereUniqueInput | VisitWhereUniqueInput[]
    delete?: VisitWhereUniqueInput | VisitWhereUniqueInput[]
    connect?: VisitWhereUniqueInput | VisitWhereUniqueInput[]
    update?: VisitUpdateWithWhereUniqueWithoutPatientInput | VisitUpdateWithWhereUniqueWithoutPatientInput[]
    updateMany?: VisitUpdateManyWithWhereWithoutPatientInput | VisitUpdateManyWithWhereWithoutPatientInput[]
    deleteMany?: VisitScalarWhereInput | VisitScalarWhereInput[]
  }

  export type AppointmentUpdateManyWithoutPatientNestedInput = {
    create?: XOR<AppointmentCreateWithoutPatientInput, AppointmentUncheckedCreateWithoutPatientInput> | AppointmentCreateWithoutPatientInput[] | AppointmentUncheckedCreateWithoutPatientInput[]
    connectOrCreate?: AppointmentCreateOrConnectWithoutPatientInput | AppointmentCreateOrConnectWithoutPatientInput[]
    upsert?: AppointmentUpsertWithWhereUniqueWithoutPatientInput | AppointmentUpsertWithWhereUniqueWithoutPatientInput[]
    createMany?: AppointmentCreateManyPatientInputEnvelope
    set?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    disconnect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    delete?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    connect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    update?: AppointmentUpdateWithWhereUniqueWithoutPatientInput | AppointmentUpdateWithWhereUniqueWithoutPatientInput[]
    updateMany?: AppointmentUpdateManyWithWhereWithoutPatientInput | AppointmentUpdateManyWithWhereWithoutPatientInput[]
    deleteMany?: AppointmentScalarWhereInput | AppointmentScalarWhereInput[]
  }

  export type VisitUncheckedUpdateManyWithoutPatientNestedInput = {
    create?: XOR<VisitCreateWithoutPatientInput, VisitUncheckedCreateWithoutPatientInput> | VisitCreateWithoutPatientInput[] | VisitUncheckedCreateWithoutPatientInput[]
    connectOrCreate?: VisitCreateOrConnectWithoutPatientInput | VisitCreateOrConnectWithoutPatientInput[]
    upsert?: VisitUpsertWithWhereUniqueWithoutPatientInput | VisitUpsertWithWhereUniqueWithoutPatientInput[]
    createMany?: VisitCreateManyPatientInputEnvelope
    set?: VisitWhereUniqueInput | VisitWhereUniqueInput[]
    disconnect?: VisitWhereUniqueInput | VisitWhereUniqueInput[]
    delete?: VisitWhereUniqueInput | VisitWhereUniqueInput[]
    connect?: VisitWhereUniqueInput | VisitWhereUniqueInput[]
    update?: VisitUpdateWithWhereUniqueWithoutPatientInput | VisitUpdateWithWhereUniqueWithoutPatientInput[]
    updateMany?: VisitUpdateManyWithWhereWithoutPatientInput | VisitUpdateManyWithWhereWithoutPatientInput[]
    deleteMany?: VisitScalarWhereInput | VisitScalarWhereInput[]
  }

  export type AppointmentUncheckedUpdateManyWithoutPatientNestedInput = {
    create?: XOR<AppointmentCreateWithoutPatientInput, AppointmentUncheckedCreateWithoutPatientInput> | AppointmentCreateWithoutPatientInput[] | AppointmentUncheckedCreateWithoutPatientInput[]
    connectOrCreate?: AppointmentCreateOrConnectWithoutPatientInput | AppointmentCreateOrConnectWithoutPatientInput[]
    upsert?: AppointmentUpsertWithWhereUniqueWithoutPatientInput | AppointmentUpsertWithWhereUniqueWithoutPatientInput[]
    createMany?: AppointmentCreateManyPatientInputEnvelope
    set?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    disconnect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    delete?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    connect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    update?: AppointmentUpdateWithWhereUniqueWithoutPatientInput | AppointmentUpdateWithWhereUniqueWithoutPatientInput[]
    updateMany?: AppointmentUpdateManyWithWhereWithoutPatientInput | AppointmentUpdateManyWithWhereWithoutPatientInput[]
    deleteMany?: AppointmentScalarWhereInput | AppointmentScalarWhereInput[]
  }

  export type VisitCreateNestedManyWithoutVetInput = {
    create?: XOR<VisitCreateWithoutVetInput, VisitUncheckedCreateWithoutVetInput> | VisitCreateWithoutVetInput[] | VisitUncheckedCreateWithoutVetInput[]
    connectOrCreate?: VisitCreateOrConnectWithoutVetInput | VisitCreateOrConnectWithoutVetInput[]
    createMany?: VisitCreateManyVetInputEnvelope
    connect?: VisitWhereUniqueInput | VisitWhereUniqueInput[]
  }

  export type VisitUncheckedCreateNestedManyWithoutVetInput = {
    create?: XOR<VisitCreateWithoutVetInput, VisitUncheckedCreateWithoutVetInput> | VisitCreateWithoutVetInput[] | VisitUncheckedCreateWithoutVetInput[]
    connectOrCreate?: VisitCreateOrConnectWithoutVetInput | VisitCreateOrConnectWithoutVetInput[]
    createMany?: VisitCreateManyVetInputEnvelope
    connect?: VisitWhereUniqueInput | VisitWhereUniqueInput[]
  }

  export type VisitUpdateManyWithoutVetNestedInput = {
    create?: XOR<VisitCreateWithoutVetInput, VisitUncheckedCreateWithoutVetInput> | VisitCreateWithoutVetInput[] | VisitUncheckedCreateWithoutVetInput[]
    connectOrCreate?: VisitCreateOrConnectWithoutVetInput | VisitCreateOrConnectWithoutVetInput[]
    upsert?: VisitUpsertWithWhereUniqueWithoutVetInput | VisitUpsertWithWhereUniqueWithoutVetInput[]
    createMany?: VisitCreateManyVetInputEnvelope
    set?: VisitWhereUniqueInput | VisitWhereUniqueInput[]
    disconnect?: VisitWhereUniqueInput | VisitWhereUniqueInput[]
    delete?: VisitWhereUniqueInput | VisitWhereUniqueInput[]
    connect?: VisitWhereUniqueInput | VisitWhereUniqueInput[]
    update?: VisitUpdateWithWhereUniqueWithoutVetInput | VisitUpdateWithWhereUniqueWithoutVetInput[]
    updateMany?: VisitUpdateManyWithWhereWithoutVetInput | VisitUpdateManyWithWhereWithoutVetInput[]
    deleteMany?: VisitScalarWhereInput | VisitScalarWhereInput[]
  }

  export type VisitUncheckedUpdateManyWithoutVetNestedInput = {
    create?: XOR<VisitCreateWithoutVetInput, VisitUncheckedCreateWithoutVetInput> | VisitCreateWithoutVetInput[] | VisitUncheckedCreateWithoutVetInput[]
    connectOrCreate?: VisitCreateOrConnectWithoutVetInput | VisitCreateOrConnectWithoutVetInput[]
    upsert?: VisitUpsertWithWhereUniqueWithoutVetInput | VisitUpsertWithWhereUniqueWithoutVetInput[]
    createMany?: VisitCreateManyVetInputEnvelope
    set?: VisitWhereUniqueInput | VisitWhereUniqueInput[]
    disconnect?: VisitWhereUniqueInput | VisitWhereUniqueInput[]
    delete?: VisitWhereUniqueInput | VisitWhereUniqueInput[]
    connect?: VisitWhereUniqueInput | VisitWhereUniqueInput[]
    update?: VisitUpdateWithWhereUniqueWithoutVetInput | VisitUpdateWithWhereUniqueWithoutVetInput[]
    updateMany?: VisitUpdateManyWithWhereWithoutVetInput | VisitUpdateManyWithWhereWithoutVetInput[]
    deleteMany?: VisitScalarWhereInput | VisitScalarWhereInput[]
  }

  export type PatientCreateNestedOneWithoutVisitsInput = {
    create?: XOR<PatientCreateWithoutVisitsInput, PatientUncheckedCreateWithoutVisitsInput>
    connectOrCreate?: PatientCreateOrConnectWithoutVisitsInput
    connect?: PatientWhereUniqueInput
  }

  export type VetCreateNestedOneWithoutVisitsInput = {
    create?: XOR<VetCreateWithoutVisitsInput, VetUncheckedCreateWithoutVisitsInput>
    connectOrCreate?: VetCreateOrConnectWithoutVisitsInput
    connect?: VetWhereUniqueInput
  }

  export type PatientUpdateOneRequiredWithoutVisitsNestedInput = {
    create?: XOR<PatientCreateWithoutVisitsInput, PatientUncheckedCreateWithoutVisitsInput>
    connectOrCreate?: PatientCreateOrConnectWithoutVisitsInput
    upsert?: PatientUpsertWithoutVisitsInput
    connect?: PatientWhereUniqueInput
    update?: XOR<XOR<PatientUpdateToOneWithWhereWithoutVisitsInput, PatientUpdateWithoutVisitsInput>, PatientUncheckedUpdateWithoutVisitsInput>
  }

  export type VetUpdateOneRequiredWithoutVisitsNestedInput = {
    create?: XOR<VetCreateWithoutVisitsInput, VetUncheckedCreateWithoutVisitsInput>
    connectOrCreate?: VetCreateOrConnectWithoutVisitsInput
    upsert?: VetUpsertWithoutVisitsInput
    connect?: VetWhereUniqueInput
    update?: XOR<XOR<VetUpdateToOneWithWhereWithoutVisitsInput, VetUpdateWithoutVisitsInput>, VetUncheckedUpdateWithoutVisitsInput>
  }

  export type ClientCreateNestedOneWithoutAppointmentsInput = {
    create?: XOR<ClientCreateWithoutAppointmentsInput, ClientUncheckedCreateWithoutAppointmentsInput>
    connectOrCreate?: ClientCreateOrConnectWithoutAppointmentsInput
    connect?: ClientWhereUniqueInput
  }

  export type PatientCreateNestedOneWithoutAppointmentsInput = {
    create?: XOR<PatientCreateWithoutAppointmentsInput, PatientUncheckedCreateWithoutAppointmentsInput>
    connectOrCreate?: PatientCreateOrConnectWithoutAppointmentsInput
    connect?: PatientWhereUniqueInput
  }

  export type ClientUpdateOneRequiredWithoutAppointmentsNestedInput = {
    create?: XOR<ClientCreateWithoutAppointmentsInput, ClientUncheckedCreateWithoutAppointmentsInput>
    connectOrCreate?: ClientCreateOrConnectWithoutAppointmentsInput
    upsert?: ClientUpsertWithoutAppointmentsInput
    connect?: ClientWhereUniqueInput
    update?: XOR<XOR<ClientUpdateToOneWithWhereWithoutAppointmentsInput, ClientUpdateWithoutAppointmentsInput>, ClientUncheckedUpdateWithoutAppointmentsInput>
  }

  export type PatientUpdateOneRequiredWithoutAppointmentsNestedInput = {
    create?: XOR<PatientCreateWithoutAppointmentsInput, PatientUncheckedCreateWithoutAppointmentsInput>
    connectOrCreate?: PatientCreateOrConnectWithoutAppointmentsInput
    upsert?: PatientUpsertWithoutAppointmentsInput
    connect?: PatientWhereUniqueInput
    update?: XOR<XOR<PatientUpdateToOneWithWhereWithoutAppointmentsInput, PatientUpdateWithoutAppointmentsInput>, PatientUncheckedUpdateWithoutAppointmentsInput>
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type PatientCreateWithoutClientInput = {
    name: string
    species: string
    breed?: string | null
    sex?: string | null
    weight?: number | null
    microchipNumber?: string | null
    color?: string | null
    birthDate?: Date | string | null
    notes?: string | null
    photoUrl?: string | null
    rabiesTag?: string | null
    preferredProvider?: string | null
    referralSource?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    visits?: VisitCreateNestedManyWithoutPatientInput
    appointments?: AppointmentCreateNestedManyWithoutPatientInput
  }

  export type PatientUncheckedCreateWithoutClientInput = {
    id?: number
    name: string
    species: string
    breed?: string | null
    sex?: string | null
    weight?: number | null
    microchipNumber?: string | null
    color?: string | null
    birthDate?: Date | string | null
    notes?: string | null
    photoUrl?: string | null
    rabiesTag?: string | null
    preferredProvider?: string | null
    referralSource?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    visits?: VisitUncheckedCreateNestedManyWithoutPatientInput
    appointments?: AppointmentUncheckedCreateNestedManyWithoutPatientInput
  }

  export type PatientCreateOrConnectWithoutClientInput = {
    where: PatientWhereUniqueInput
    create: XOR<PatientCreateWithoutClientInput, PatientUncheckedCreateWithoutClientInput>
  }

  export type PatientCreateManyClientInputEnvelope = {
    data: PatientCreateManyClientInput | PatientCreateManyClientInput[]
  }

  export type AppointmentCreateWithoutClientInput = {
    startTime: Date | string
    endTime: Date | string
    description?: string | null
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    patient: PatientCreateNestedOneWithoutAppointmentsInput
  }

  export type AppointmentUncheckedCreateWithoutClientInput = {
    id?: number
    startTime: Date | string
    endTime: Date | string
    description?: string | null
    status?: string
    patientId: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AppointmentCreateOrConnectWithoutClientInput = {
    where: AppointmentWhereUniqueInput
    create: XOR<AppointmentCreateWithoutClientInput, AppointmentUncheckedCreateWithoutClientInput>
  }

  export type AppointmentCreateManyClientInputEnvelope = {
    data: AppointmentCreateManyClientInput | AppointmentCreateManyClientInput[]
  }

  export type PatientUpsertWithWhereUniqueWithoutClientInput = {
    where: PatientWhereUniqueInput
    update: XOR<PatientUpdateWithoutClientInput, PatientUncheckedUpdateWithoutClientInput>
    create: XOR<PatientCreateWithoutClientInput, PatientUncheckedCreateWithoutClientInput>
  }

  export type PatientUpdateWithWhereUniqueWithoutClientInput = {
    where: PatientWhereUniqueInput
    data: XOR<PatientUpdateWithoutClientInput, PatientUncheckedUpdateWithoutClientInput>
  }

  export type PatientUpdateManyWithWhereWithoutClientInput = {
    where: PatientScalarWhereInput
    data: XOR<PatientUpdateManyMutationInput, PatientUncheckedUpdateManyWithoutClientInput>
  }

  export type PatientScalarWhereInput = {
    AND?: PatientScalarWhereInput | PatientScalarWhereInput[]
    OR?: PatientScalarWhereInput[]
    NOT?: PatientScalarWhereInput | PatientScalarWhereInput[]
    id?: IntFilter<"Patient"> | number
    name?: StringFilter<"Patient"> | string
    species?: StringFilter<"Patient"> | string
    breed?: StringNullableFilter<"Patient"> | string | null
    sex?: StringNullableFilter<"Patient"> | string | null
    weight?: FloatNullableFilter<"Patient"> | number | null
    microchipNumber?: StringNullableFilter<"Patient"> | string | null
    color?: StringNullableFilter<"Patient"> | string | null
    birthDate?: DateTimeNullableFilter<"Patient"> | Date | string | null
    notes?: StringNullableFilter<"Patient"> | string | null
    clientId?: IntFilter<"Patient"> | number
    photoUrl?: StringNullableFilter<"Patient"> | string | null
    rabiesTag?: StringNullableFilter<"Patient"> | string | null
    preferredProvider?: StringNullableFilter<"Patient"> | string | null
    referralSource?: StringNullableFilter<"Patient"> | string | null
    createdAt?: DateTimeFilter<"Patient"> | Date | string
    updatedAt?: DateTimeFilter<"Patient"> | Date | string
  }

  export type AppointmentUpsertWithWhereUniqueWithoutClientInput = {
    where: AppointmentWhereUniqueInput
    update: XOR<AppointmentUpdateWithoutClientInput, AppointmentUncheckedUpdateWithoutClientInput>
    create: XOR<AppointmentCreateWithoutClientInput, AppointmentUncheckedCreateWithoutClientInput>
  }

  export type AppointmentUpdateWithWhereUniqueWithoutClientInput = {
    where: AppointmentWhereUniqueInput
    data: XOR<AppointmentUpdateWithoutClientInput, AppointmentUncheckedUpdateWithoutClientInput>
  }

  export type AppointmentUpdateManyWithWhereWithoutClientInput = {
    where: AppointmentScalarWhereInput
    data: XOR<AppointmentUpdateManyMutationInput, AppointmentUncheckedUpdateManyWithoutClientInput>
  }

  export type AppointmentScalarWhereInput = {
    AND?: AppointmentScalarWhereInput | AppointmentScalarWhereInput[]
    OR?: AppointmentScalarWhereInput[]
    NOT?: AppointmentScalarWhereInput | AppointmentScalarWhereInput[]
    id?: IntFilter<"Appointment"> | number
    startTime?: DateTimeFilter<"Appointment"> | Date | string
    endTime?: DateTimeFilter<"Appointment"> | Date | string
    description?: StringNullableFilter<"Appointment"> | string | null
    status?: StringFilter<"Appointment"> | string
    clientId?: IntFilter<"Appointment"> | number
    patientId?: IntFilter<"Appointment"> | number
    createdAt?: DateTimeFilter<"Appointment"> | Date | string
    updatedAt?: DateTimeFilter<"Appointment"> | Date | string
  }

  export type ClientCreateWithoutPetsInput = {
    firstName: string
    lastName: string
    email?: string | null
    phone?: string | null
    secondaryPhone?: string | null
    address?: string | null
    emergencyContactName?: string | null
    emergencyContactPhone?: string | null
    notes?: string | null
    dob?: Date | string | null
    gender?: string | null
    driverLicenseState?: string | null
    driverLicenseNumber?: string | null
    driverLicenseExp?: string | null
    clientType?: string | null
    active?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    appointments?: AppointmentCreateNestedManyWithoutClientInput
  }

  export type ClientUncheckedCreateWithoutPetsInput = {
    id?: number
    firstName: string
    lastName: string
    email?: string | null
    phone?: string | null
    secondaryPhone?: string | null
    address?: string | null
    emergencyContactName?: string | null
    emergencyContactPhone?: string | null
    notes?: string | null
    dob?: Date | string | null
    gender?: string | null
    driverLicenseState?: string | null
    driverLicenseNumber?: string | null
    driverLicenseExp?: string | null
    clientType?: string | null
    active?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    appointments?: AppointmentUncheckedCreateNestedManyWithoutClientInput
  }

  export type ClientCreateOrConnectWithoutPetsInput = {
    where: ClientWhereUniqueInput
    create: XOR<ClientCreateWithoutPetsInput, ClientUncheckedCreateWithoutPetsInput>
  }

  export type VisitCreateWithoutPatientInput = {
    date?: Date | string
    notes: string
    createdAt?: Date | string
    updatedAt?: Date | string
    vet: VetCreateNestedOneWithoutVisitsInput
  }

  export type VisitUncheckedCreateWithoutPatientInput = {
    id?: number
    date?: Date | string
    notes: string
    vetId: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type VisitCreateOrConnectWithoutPatientInput = {
    where: VisitWhereUniqueInput
    create: XOR<VisitCreateWithoutPatientInput, VisitUncheckedCreateWithoutPatientInput>
  }

  export type VisitCreateManyPatientInputEnvelope = {
    data: VisitCreateManyPatientInput | VisitCreateManyPatientInput[]
  }

  export type AppointmentCreateWithoutPatientInput = {
    startTime: Date | string
    endTime: Date | string
    description?: string | null
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    client: ClientCreateNestedOneWithoutAppointmentsInput
  }

  export type AppointmentUncheckedCreateWithoutPatientInput = {
    id?: number
    startTime: Date | string
    endTime: Date | string
    description?: string | null
    status?: string
    clientId: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AppointmentCreateOrConnectWithoutPatientInput = {
    where: AppointmentWhereUniqueInput
    create: XOR<AppointmentCreateWithoutPatientInput, AppointmentUncheckedCreateWithoutPatientInput>
  }

  export type AppointmentCreateManyPatientInputEnvelope = {
    data: AppointmentCreateManyPatientInput | AppointmentCreateManyPatientInput[]
  }

  export type ClientUpsertWithoutPetsInput = {
    update: XOR<ClientUpdateWithoutPetsInput, ClientUncheckedUpdateWithoutPetsInput>
    create: XOR<ClientCreateWithoutPetsInput, ClientUncheckedCreateWithoutPetsInput>
    where?: ClientWhereInput
  }

  export type ClientUpdateToOneWithWhereWithoutPetsInput = {
    where?: ClientWhereInput
    data: XOR<ClientUpdateWithoutPetsInput, ClientUncheckedUpdateWithoutPetsInput>
  }

  export type ClientUpdateWithoutPetsInput = {
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    secondaryPhone?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    emergencyContactName?: NullableStringFieldUpdateOperationsInput | string | null
    emergencyContactPhone?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    dob?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    driverLicenseState?: NullableStringFieldUpdateOperationsInput | string | null
    driverLicenseNumber?: NullableStringFieldUpdateOperationsInput | string | null
    driverLicenseExp?: NullableStringFieldUpdateOperationsInput | string | null
    clientType?: NullableStringFieldUpdateOperationsInput | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    appointments?: AppointmentUpdateManyWithoutClientNestedInput
  }

  export type ClientUncheckedUpdateWithoutPetsInput = {
    id?: IntFieldUpdateOperationsInput | number
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    secondaryPhone?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    emergencyContactName?: NullableStringFieldUpdateOperationsInput | string | null
    emergencyContactPhone?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    dob?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    driverLicenseState?: NullableStringFieldUpdateOperationsInput | string | null
    driverLicenseNumber?: NullableStringFieldUpdateOperationsInput | string | null
    driverLicenseExp?: NullableStringFieldUpdateOperationsInput | string | null
    clientType?: NullableStringFieldUpdateOperationsInput | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    appointments?: AppointmentUncheckedUpdateManyWithoutClientNestedInput
  }

  export type VisitUpsertWithWhereUniqueWithoutPatientInput = {
    where: VisitWhereUniqueInput
    update: XOR<VisitUpdateWithoutPatientInput, VisitUncheckedUpdateWithoutPatientInput>
    create: XOR<VisitCreateWithoutPatientInput, VisitUncheckedCreateWithoutPatientInput>
  }

  export type VisitUpdateWithWhereUniqueWithoutPatientInput = {
    where: VisitWhereUniqueInput
    data: XOR<VisitUpdateWithoutPatientInput, VisitUncheckedUpdateWithoutPatientInput>
  }

  export type VisitUpdateManyWithWhereWithoutPatientInput = {
    where: VisitScalarWhereInput
    data: XOR<VisitUpdateManyMutationInput, VisitUncheckedUpdateManyWithoutPatientInput>
  }

  export type VisitScalarWhereInput = {
    AND?: VisitScalarWhereInput | VisitScalarWhereInput[]
    OR?: VisitScalarWhereInput[]
    NOT?: VisitScalarWhereInput | VisitScalarWhereInput[]
    id?: IntFilter<"Visit"> | number
    date?: DateTimeFilter<"Visit"> | Date | string
    notes?: StringFilter<"Visit"> | string
    patientId?: IntFilter<"Visit"> | number
    vetId?: IntFilter<"Visit"> | number
    createdAt?: DateTimeFilter<"Visit"> | Date | string
    updatedAt?: DateTimeFilter<"Visit"> | Date | string
  }

  export type AppointmentUpsertWithWhereUniqueWithoutPatientInput = {
    where: AppointmentWhereUniqueInput
    update: XOR<AppointmentUpdateWithoutPatientInput, AppointmentUncheckedUpdateWithoutPatientInput>
    create: XOR<AppointmentCreateWithoutPatientInput, AppointmentUncheckedCreateWithoutPatientInput>
  }

  export type AppointmentUpdateWithWhereUniqueWithoutPatientInput = {
    where: AppointmentWhereUniqueInput
    data: XOR<AppointmentUpdateWithoutPatientInput, AppointmentUncheckedUpdateWithoutPatientInput>
  }

  export type AppointmentUpdateManyWithWhereWithoutPatientInput = {
    where: AppointmentScalarWhereInput
    data: XOR<AppointmentUpdateManyMutationInput, AppointmentUncheckedUpdateManyWithoutPatientInput>
  }

  export type VisitCreateWithoutVetInput = {
    date?: Date | string
    notes: string
    createdAt?: Date | string
    updatedAt?: Date | string
    patient: PatientCreateNestedOneWithoutVisitsInput
  }

  export type VisitUncheckedCreateWithoutVetInput = {
    id?: number
    date?: Date | string
    notes: string
    patientId: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type VisitCreateOrConnectWithoutVetInput = {
    where: VisitWhereUniqueInput
    create: XOR<VisitCreateWithoutVetInput, VisitUncheckedCreateWithoutVetInput>
  }

  export type VisitCreateManyVetInputEnvelope = {
    data: VisitCreateManyVetInput | VisitCreateManyVetInput[]
  }

  export type VisitUpsertWithWhereUniqueWithoutVetInput = {
    where: VisitWhereUniqueInput
    update: XOR<VisitUpdateWithoutVetInput, VisitUncheckedUpdateWithoutVetInput>
    create: XOR<VisitCreateWithoutVetInput, VisitUncheckedCreateWithoutVetInput>
  }

  export type VisitUpdateWithWhereUniqueWithoutVetInput = {
    where: VisitWhereUniqueInput
    data: XOR<VisitUpdateWithoutVetInput, VisitUncheckedUpdateWithoutVetInput>
  }

  export type VisitUpdateManyWithWhereWithoutVetInput = {
    where: VisitScalarWhereInput
    data: XOR<VisitUpdateManyMutationInput, VisitUncheckedUpdateManyWithoutVetInput>
  }

  export type PatientCreateWithoutVisitsInput = {
    name: string
    species: string
    breed?: string | null
    sex?: string | null
    weight?: number | null
    microchipNumber?: string | null
    color?: string | null
    birthDate?: Date | string | null
    notes?: string | null
    photoUrl?: string | null
    rabiesTag?: string | null
    preferredProvider?: string | null
    referralSource?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    client: ClientCreateNestedOneWithoutPetsInput
    appointments?: AppointmentCreateNestedManyWithoutPatientInput
  }

  export type PatientUncheckedCreateWithoutVisitsInput = {
    id?: number
    name: string
    species: string
    breed?: string | null
    sex?: string | null
    weight?: number | null
    microchipNumber?: string | null
    color?: string | null
    birthDate?: Date | string | null
    notes?: string | null
    clientId: number
    photoUrl?: string | null
    rabiesTag?: string | null
    preferredProvider?: string | null
    referralSource?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    appointments?: AppointmentUncheckedCreateNestedManyWithoutPatientInput
  }

  export type PatientCreateOrConnectWithoutVisitsInput = {
    where: PatientWhereUniqueInput
    create: XOR<PatientCreateWithoutVisitsInput, PatientUncheckedCreateWithoutVisitsInput>
  }

  export type VetCreateWithoutVisitsInput = {
    name: string
    email: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type VetUncheckedCreateWithoutVisitsInput = {
    id?: number
    name: string
    email: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type VetCreateOrConnectWithoutVisitsInput = {
    where: VetWhereUniqueInput
    create: XOR<VetCreateWithoutVisitsInput, VetUncheckedCreateWithoutVisitsInput>
  }

  export type PatientUpsertWithoutVisitsInput = {
    update: XOR<PatientUpdateWithoutVisitsInput, PatientUncheckedUpdateWithoutVisitsInput>
    create: XOR<PatientCreateWithoutVisitsInput, PatientUncheckedCreateWithoutVisitsInput>
    where?: PatientWhereInput
  }

  export type PatientUpdateToOneWithWhereWithoutVisitsInput = {
    where?: PatientWhereInput
    data: XOR<PatientUpdateWithoutVisitsInput, PatientUncheckedUpdateWithoutVisitsInput>
  }

  export type PatientUpdateWithoutVisitsInput = {
    name?: StringFieldUpdateOperationsInput | string
    species?: StringFieldUpdateOperationsInput | string
    breed?: NullableStringFieldUpdateOperationsInput | string | null
    sex?: NullableStringFieldUpdateOperationsInput | string | null
    weight?: NullableFloatFieldUpdateOperationsInput | number | null
    microchipNumber?: NullableStringFieldUpdateOperationsInput | string | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
    birthDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    rabiesTag?: NullableStringFieldUpdateOperationsInput | string | null
    preferredProvider?: NullableStringFieldUpdateOperationsInput | string | null
    referralSource?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    client?: ClientUpdateOneRequiredWithoutPetsNestedInput
    appointments?: AppointmentUpdateManyWithoutPatientNestedInput
  }

  export type PatientUncheckedUpdateWithoutVisitsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    species?: StringFieldUpdateOperationsInput | string
    breed?: NullableStringFieldUpdateOperationsInput | string | null
    sex?: NullableStringFieldUpdateOperationsInput | string | null
    weight?: NullableFloatFieldUpdateOperationsInput | number | null
    microchipNumber?: NullableStringFieldUpdateOperationsInput | string | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
    birthDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    clientId?: IntFieldUpdateOperationsInput | number
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    rabiesTag?: NullableStringFieldUpdateOperationsInput | string | null
    preferredProvider?: NullableStringFieldUpdateOperationsInput | string | null
    referralSource?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    appointments?: AppointmentUncheckedUpdateManyWithoutPatientNestedInput
  }

  export type VetUpsertWithoutVisitsInput = {
    update: XOR<VetUpdateWithoutVisitsInput, VetUncheckedUpdateWithoutVisitsInput>
    create: XOR<VetCreateWithoutVisitsInput, VetUncheckedCreateWithoutVisitsInput>
    where?: VetWhereInput
  }

  export type VetUpdateToOneWithWhereWithoutVisitsInput = {
    where?: VetWhereInput
    data: XOR<VetUpdateWithoutVisitsInput, VetUncheckedUpdateWithoutVisitsInput>
  }

  export type VetUpdateWithoutVisitsInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VetUncheckedUpdateWithoutVisitsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClientCreateWithoutAppointmentsInput = {
    firstName: string
    lastName: string
    email?: string | null
    phone?: string | null
    secondaryPhone?: string | null
    address?: string | null
    emergencyContactName?: string | null
    emergencyContactPhone?: string | null
    notes?: string | null
    dob?: Date | string | null
    gender?: string | null
    driverLicenseState?: string | null
    driverLicenseNumber?: string | null
    driverLicenseExp?: string | null
    clientType?: string | null
    active?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    pets?: PatientCreateNestedManyWithoutClientInput
  }

  export type ClientUncheckedCreateWithoutAppointmentsInput = {
    id?: number
    firstName: string
    lastName: string
    email?: string | null
    phone?: string | null
    secondaryPhone?: string | null
    address?: string | null
    emergencyContactName?: string | null
    emergencyContactPhone?: string | null
    notes?: string | null
    dob?: Date | string | null
    gender?: string | null
    driverLicenseState?: string | null
    driverLicenseNumber?: string | null
    driverLicenseExp?: string | null
    clientType?: string | null
    active?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    pets?: PatientUncheckedCreateNestedManyWithoutClientInput
  }

  export type ClientCreateOrConnectWithoutAppointmentsInput = {
    where: ClientWhereUniqueInput
    create: XOR<ClientCreateWithoutAppointmentsInput, ClientUncheckedCreateWithoutAppointmentsInput>
  }

  export type PatientCreateWithoutAppointmentsInput = {
    name: string
    species: string
    breed?: string | null
    sex?: string | null
    weight?: number | null
    microchipNumber?: string | null
    color?: string | null
    birthDate?: Date | string | null
    notes?: string | null
    photoUrl?: string | null
    rabiesTag?: string | null
    preferredProvider?: string | null
    referralSource?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    client: ClientCreateNestedOneWithoutPetsInput
    visits?: VisitCreateNestedManyWithoutPatientInput
  }

  export type PatientUncheckedCreateWithoutAppointmentsInput = {
    id?: number
    name: string
    species: string
    breed?: string | null
    sex?: string | null
    weight?: number | null
    microchipNumber?: string | null
    color?: string | null
    birthDate?: Date | string | null
    notes?: string | null
    clientId: number
    photoUrl?: string | null
    rabiesTag?: string | null
    preferredProvider?: string | null
    referralSource?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    visits?: VisitUncheckedCreateNestedManyWithoutPatientInput
  }

  export type PatientCreateOrConnectWithoutAppointmentsInput = {
    where: PatientWhereUniqueInput
    create: XOR<PatientCreateWithoutAppointmentsInput, PatientUncheckedCreateWithoutAppointmentsInput>
  }

  export type ClientUpsertWithoutAppointmentsInput = {
    update: XOR<ClientUpdateWithoutAppointmentsInput, ClientUncheckedUpdateWithoutAppointmentsInput>
    create: XOR<ClientCreateWithoutAppointmentsInput, ClientUncheckedCreateWithoutAppointmentsInput>
    where?: ClientWhereInput
  }

  export type ClientUpdateToOneWithWhereWithoutAppointmentsInput = {
    where?: ClientWhereInput
    data: XOR<ClientUpdateWithoutAppointmentsInput, ClientUncheckedUpdateWithoutAppointmentsInput>
  }

  export type ClientUpdateWithoutAppointmentsInput = {
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    secondaryPhone?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    emergencyContactName?: NullableStringFieldUpdateOperationsInput | string | null
    emergencyContactPhone?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    dob?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    driverLicenseState?: NullableStringFieldUpdateOperationsInput | string | null
    driverLicenseNumber?: NullableStringFieldUpdateOperationsInput | string | null
    driverLicenseExp?: NullableStringFieldUpdateOperationsInput | string | null
    clientType?: NullableStringFieldUpdateOperationsInput | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    pets?: PatientUpdateManyWithoutClientNestedInput
  }

  export type ClientUncheckedUpdateWithoutAppointmentsInput = {
    id?: IntFieldUpdateOperationsInput | number
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    secondaryPhone?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    emergencyContactName?: NullableStringFieldUpdateOperationsInput | string | null
    emergencyContactPhone?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    dob?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    driverLicenseState?: NullableStringFieldUpdateOperationsInput | string | null
    driverLicenseNumber?: NullableStringFieldUpdateOperationsInput | string | null
    driverLicenseExp?: NullableStringFieldUpdateOperationsInput | string | null
    clientType?: NullableStringFieldUpdateOperationsInput | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    pets?: PatientUncheckedUpdateManyWithoutClientNestedInput
  }

  export type PatientUpsertWithoutAppointmentsInput = {
    update: XOR<PatientUpdateWithoutAppointmentsInput, PatientUncheckedUpdateWithoutAppointmentsInput>
    create: XOR<PatientCreateWithoutAppointmentsInput, PatientUncheckedCreateWithoutAppointmentsInput>
    where?: PatientWhereInput
  }

  export type PatientUpdateToOneWithWhereWithoutAppointmentsInput = {
    where?: PatientWhereInput
    data: XOR<PatientUpdateWithoutAppointmentsInput, PatientUncheckedUpdateWithoutAppointmentsInput>
  }

  export type PatientUpdateWithoutAppointmentsInput = {
    name?: StringFieldUpdateOperationsInput | string
    species?: StringFieldUpdateOperationsInput | string
    breed?: NullableStringFieldUpdateOperationsInput | string | null
    sex?: NullableStringFieldUpdateOperationsInput | string | null
    weight?: NullableFloatFieldUpdateOperationsInput | number | null
    microchipNumber?: NullableStringFieldUpdateOperationsInput | string | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
    birthDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    rabiesTag?: NullableStringFieldUpdateOperationsInput | string | null
    preferredProvider?: NullableStringFieldUpdateOperationsInput | string | null
    referralSource?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    client?: ClientUpdateOneRequiredWithoutPetsNestedInput
    visits?: VisitUpdateManyWithoutPatientNestedInput
  }

  export type PatientUncheckedUpdateWithoutAppointmentsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    species?: StringFieldUpdateOperationsInput | string
    breed?: NullableStringFieldUpdateOperationsInput | string | null
    sex?: NullableStringFieldUpdateOperationsInput | string | null
    weight?: NullableFloatFieldUpdateOperationsInput | number | null
    microchipNumber?: NullableStringFieldUpdateOperationsInput | string | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
    birthDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    clientId?: IntFieldUpdateOperationsInput | number
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    rabiesTag?: NullableStringFieldUpdateOperationsInput | string | null
    preferredProvider?: NullableStringFieldUpdateOperationsInput | string | null
    referralSource?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    visits?: VisitUncheckedUpdateManyWithoutPatientNestedInput
  }

  export type PatientCreateManyClientInput = {
    id?: number
    name: string
    species: string
    breed?: string | null
    sex?: string | null
    weight?: number | null
    microchipNumber?: string | null
    color?: string | null
    birthDate?: Date | string | null
    notes?: string | null
    photoUrl?: string | null
    rabiesTag?: string | null
    preferredProvider?: string | null
    referralSource?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AppointmentCreateManyClientInput = {
    id?: number
    startTime: Date | string
    endTime: Date | string
    description?: string | null
    status?: string
    patientId: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PatientUpdateWithoutClientInput = {
    name?: StringFieldUpdateOperationsInput | string
    species?: StringFieldUpdateOperationsInput | string
    breed?: NullableStringFieldUpdateOperationsInput | string | null
    sex?: NullableStringFieldUpdateOperationsInput | string | null
    weight?: NullableFloatFieldUpdateOperationsInput | number | null
    microchipNumber?: NullableStringFieldUpdateOperationsInput | string | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
    birthDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    rabiesTag?: NullableStringFieldUpdateOperationsInput | string | null
    preferredProvider?: NullableStringFieldUpdateOperationsInput | string | null
    referralSource?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    visits?: VisitUpdateManyWithoutPatientNestedInput
    appointments?: AppointmentUpdateManyWithoutPatientNestedInput
  }

  export type PatientUncheckedUpdateWithoutClientInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    species?: StringFieldUpdateOperationsInput | string
    breed?: NullableStringFieldUpdateOperationsInput | string | null
    sex?: NullableStringFieldUpdateOperationsInput | string | null
    weight?: NullableFloatFieldUpdateOperationsInput | number | null
    microchipNumber?: NullableStringFieldUpdateOperationsInput | string | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
    birthDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    rabiesTag?: NullableStringFieldUpdateOperationsInput | string | null
    preferredProvider?: NullableStringFieldUpdateOperationsInput | string | null
    referralSource?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    visits?: VisitUncheckedUpdateManyWithoutPatientNestedInput
    appointments?: AppointmentUncheckedUpdateManyWithoutPatientNestedInput
  }

  export type PatientUncheckedUpdateManyWithoutClientInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    species?: StringFieldUpdateOperationsInput | string
    breed?: NullableStringFieldUpdateOperationsInput | string | null
    sex?: NullableStringFieldUpdateOperationsInput | string | null
    weight?: NullableFloatFieldUpdateOperationsInput | number | null
    microchipNumber?: NullableStringFieldUpdateOperationsInput | string | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
    birthDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    rabiesTag?: NullableStringFieldUpdateOperationsInput | string | null
    preferredProvider?: NullableStringFieldUpdateOperationsInput | string | null
    referralSource?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AppointmentUpdateWithoutClientInput = {
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    patient?: PatientUpdateOneRequiredWithoutAppointmentsNestedInput
  }

  export type AppointmentUncheckedUpdateWithoutClientInput = {
    id?: IntFieldUpdateOperationsInput | number
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    patientId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AppointmentUncheckedUpdateManyWithoutClientInput = {
    id?: IntFieldUpdateOperationsInput | number
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    patientId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VisitCreateManyPatientInput = {
    id?: number
    date?: Date | string
    notes: string
    vetId: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AppointmentCreateManyPatientInput = {
    id?: number
    startTime: Date | string
    endTime: Date | string
    description?: string | null
    status?: string
    clientId: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type VisitUpdateWithoutPatientInput = {
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    vet?: VetUpdateOneRequiredWithoutVisitsNestedInput
  }

  export type VisitUncheckedUpdateWithoutPatientInput = {
    id?: IntFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: StringFieldUpdateOperationsInput | string
    vetId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VisitUncheckedUpdateManyWithoutPatientInput = {
    id?: IntFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: StringFieldUpdateOperationsInput | string
    vetId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AppointmentUpdateWithoutPatientInput = {
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    client?: ClientUpdateOneRequiredWithoutAppointmentsNestedInput
  }

  export type AppointmentUncheckedUpdateWithoutPatientInput = {
    id?: IntFieldUpdateOperationsInput | number
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    clientId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AppointmentUncheckedUpdateManyWithoutPatientInput = {
    id?: IntFieldUpdateOperationsInput | number
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    clientId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VisitCreateManyVetInput = {
    id?: number
    date?: Date | string
    notes: string
    patientId: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type VisitUpdateWithoutVetInput = {
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    patient?: PatientUpdateOneRequiredWithoutVisitsNestedInput
  }

  export type VisitUncheckedUpdateWithoutVetInput = {
    id?: IntFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: StringFieldUpdateOperationsInput | string
    patientId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VisitUncheckedUpdateManyWithoutVetInput = {
    id?: IntFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: StringFieldUpdateOperationsInput | string
    patientId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use ClientCountOutputTypeDefaultArgs instead
     */
    export type ClientCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ClientCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use PatientCountOutputTypeDefaultArgs instead
     */
    export type PatientCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = PatientCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use VetCountOutputTypeDefaultArgs instead
     */
    export type VetCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = VetCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ClientDefaultArgs instead
     */
    export type ClientArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ClientDefaultArgs<ExtArgs>
    /**
     * @deprecated Use PatientDefaultArgs instead
     */
    export type PatientArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = PatientDefaultArgs<ExtArgs>
    /**
     * @deprecated Use VetDefaultArgs instead
     */
    export type VetArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = VetDefaultArgs<ExtArgs>
    /**
     * @deprecated Use VisitDefaultArgs instead
     */
    export type VisitArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = VisitDefaultArgs<ExtArgs>
    /**
     * @deprecated Use AppointmentDefaultArgs instead
     */
    export type AppointmentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = AppointmentDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ClinicConfigDefaultArgs instead
     */
    export type ClinicConfigArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ClinicConfigDefaultArgs<ExtArgs>

  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}