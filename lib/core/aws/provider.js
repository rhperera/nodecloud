const awsSDk = require('aws-sdk');
const EC2 = require('../../compute/aws-ec2');
const ECS = require('../../compute/aws-ecs');
const EBS = require('../../storage/aws-ebs');
const S3 = require('../../storage/aws-s3');
const ELB = require('../../network/aws-elb');
const Route53 = require('../../network/aws-route53');
const DirectConnect = require('../../network/aws-directconnect');
const RDS = require('../../database/aws-rds');

class AWS {
  /**
   * Expose AWS APIs
   * @constructor
   */
  constructor(configPath) {
    this._AWS = awsSDk;

    if (
      !this._AWS.config.credentials.accessKeyId ||
      !this._AWS.config.credentials.secretAccessKey ||
      !process.env.AWS_REGION
    ) {
      if (configPath) {
        this._AWS.config.loadFromPath(configPath);
      } else {
        throw new Error('Provide credentials <link to docs>');
      }
    }

    return {
      getSDK: () => this._AWS,
      compute: this.EC2,
      storage: this.EBS,
      s3: this.S3,
      loadbalancer: this.ELB,
      dns: this.Route53,
      peering: this.DirectConnect,
      container: this.ECS,
      rdbms: this.RDS,
    };
  }
  /**
   * EC2 Wrapper
   * @EC2
   * @param {object} options - { apiVersion }
   */
  EC2(options) {
    this._apiVersion = options.apiVersion;
    return new EC2(this.getSDK(), this._apiVersion);
  }
  /**
   * EBS Wrapper
   * @EBS
   * @param {object} options - { apiVersion }
   */
  EBS(options) {
    this._apiVersion = options.apiVersion;
    return new EBS(this.getSDK(), this._apiVersion);
  }
  /**
   * S3 Wrapper
   * @EBS
   * @param {object} options - { apiVersion }
   */
  S3(options) {
    if (options._apiVersion) {
      this._apiVersion = options.apiVersion;
      return new S3(this.getSDK(), this.apiVersion);
    }
    return new S3(this.getSDK());
  }
  /**
   * ELB Wrapper
   * @ELB
   * @param {object} options - { apiVersion }
   */
  ELB(options) {
    if (options._apiVersion) {
      this._apiVersion = options.apiVersion;
      return new ELB(this.getSDK(), this.apiVersion);
    }
    return new ELB(this.getSDK());
  }
  /**
   * Route53 wrapper
   * @Route53
   * @param {object} options - { apiVersion }
   */
  Route53(options) {
    if (options._apiVersion) {
      this._apiVersion = options.apiVersion;
      return new Route53(this.getSDK(), this.apiVersion);
    }
    return new Route53(this.getSDK());
  }
  /**
   * DirectConnect wrapper
   * @DirectConnect
   * @param {object} options - { apiVersion }
   */
  DirectConnect(options) {
    if (options._apiVersion) {
      this._apiVersion = options.apiVersion;
      return new DirectConnect(this.getSDK(), this.apiVersion);
    }
    return new DirectConnect(this.getSDK());
  }
  /**
   * ECS wrapper
   * @ECS
   * @param {object} options - { apiVersion }
   */
  ECS(options) {
    if (options._apiVersion) {
      this._apiVersion = options.apiVersion;
      return new ECS(this.getSDK(), this.apiVersion);
    }
    return new ECS(this.getSDK());
  }
  /**
   * RDS wrapper
   * @RDS
   * @param {object} options - { apiVersion }
   */
  RDS(options) {
    if (options._apiVersion) {
      this._apiVersion = options.apiVersion;
      return new RDS(this.getSDK(), this.apiVersion);
    }
    return new RDS(this.getSDK());
  }
}

module.exports = AWS;
